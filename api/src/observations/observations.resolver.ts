import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ObservationsService } from './observations.service'
import { Observation } from './entities/observation.entity'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { BirdsService } from '../birds/birds.service'
import { LocationsService } from '../locations/locations.service'
import { Bird } from '../birds/entities/bird.entity'
import { Location } from '../locations/entities/location.entity'
import { ClientMessage, MessageTypes } from '../bootstrap/entitties/ClientMessage'
import { FirebaseGuard } from 'src/auth/guard/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { NotificationsGateway } from 'src/notifications/notifications.gateway'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdService: BirdsService,
    private readonly locationService: LocationsService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @ResolveField()
  bird(@Parent() o: Observation): Promise<Bird> {
    return this.birdService.findOne(o.birdId)
  }

  @ResolveField()
  location(@Parent() o: Observation): Promise<Location> {
    //@ts-ignore
    return this.locationService.findOne(o.locationId)
  }

  @Mutation(() => Observation)
  async createObservation(
    @Args('createObservationInput')
    createObservationInput: CreateObservationInput,
  ) {
    const obs = await this.observationsService.create(createObservationInput)
    const locat = await this.locationService.findLocationByPoint(obs.geolocation)
    if (locat.length > 0) {
      //verwittig iedereen in deze room
      this.notificationsGateway.server.to(locat[0].name).emit('bird:observation', obs)
    }
    return obs
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Observation], { name: 'observations' })
  findAll(@CurrentUser() user) {
    console.log(user)
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput')
    updateObservationInput: UpdateObservationInput,
  ) {
    return this.observationsService.update(updateObservationInput)
  }

  @Mutation(() => Observation)
  async removeObservation(@Args('id', { type: () => String }) id: string): Promise<ClientMessage> {
    const deleted = await this.observationsService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Bird deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very wrong.',
      statusCode: 400,
    }
  }
}
