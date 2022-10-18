import { LivelocationsService } from 'src/livelocations/livelocations.service'
import { LocationsModule } from 'src/locations/locations.module'
import { LocationsService } from 'src/locations/locations.service'
import { Server, Socket } from 'socket.io'
import {
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { CreateLivelocationInput } from 'src/livelocations/dto/create-livelocation.input'
import { Livelocation } from 'src/livelocations/entities/livelocation.entity'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { MyWebSocketValidationPipe } from 'src/bootstrap/exceptions/MyWebSocketValidationPipe'

@WebSocketGateway(3004)
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly livelocationService: LivelocationsService,
    private readonly locationsService: LocationsService,
  ) {}

  @WebSocketServer() //ipv afterInit()
  server: Server

  numberOfClients: number = 0

  @UsePipes(new MyWebSocketValidationPipe())
  @SubscribeMessage('birdspotter:moving')
  async handleBirdspotterMoving(
    @MessageBody() data: CreateLivelocationInput,
    @ConnectedSocket() client: Socket,
  ): Promise<Livelocation> {
    console.log('bird')
    console.log(data)
    const liveLoc = await this.livelocationService.create(data)

    const l = await this.locationsService.findLocationByPoint(liveLoc.geolocation)

    if (l.length > 0) {
      console.log('in a known area/location')
      console.log(l[0].name)
      console.log('Rooms of this client: ', client.rooms)
      client.join(l[0].name)
      console.log('Rooms of this client: ', client.rooms)
      //this.server.emit('birdspotter:newlocation', liveLoc)
      this.server.to(l[0].name).emit('birdspotter:newlocation', liveLoc)
    } else {
      console.log('not in a known area/location')
    }

    return Promise.resolve(liveLoc)
  }

  handleDisconnect(client: any) {
    this.numberOfClients--
    // Notify connected clients of current users
    this.server.emit('users:userLeaving', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.numberOfClients++
    // Notify connected clients of current users
    this.server.emit('users:newuserconnetected', {
      connectedUsers: this.numberOfClients,
    })
    console.log('A client has connected')
    console.log(`Number of clients: ${this.numberOfClients}`)
  }
}
