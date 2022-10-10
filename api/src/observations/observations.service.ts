import { Injectable } from '@nestjs/common'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { Observation } from './entities/observation.entity'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
  ) {}
  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.userId = createObservationInput.userId
    o.birdId = createObservationInput.birdId
    o.locationId = createObservationInput.locationId
    o.active = createObservationInput.active
    return this.observationRepository.save(o)
  }

  findAll(): Promise<Observation[]> {
    return this.observationRepository.find()
  }

  findOne(id: string): Promise<Observation> {
    return this.observationRepository.findOne(new ObjectId(id))
  }

  update(updateObservationInput: UpdateObservationInput) {
    const update = new Observation()
    update.id = updateObservationInput.id
    update.name = updateObservationInput.name
    update.description = updateObservationInput.description
    update.weather = updateObservationInput.weather
    // update.birds = updateObservationInput.bird
    update.birdId = updateObservationInput.birdId
    // update.location = updateObservationInput.location
    update.locationId = updateObservationInput.locationId
    update.active = updateObservationInput.active
    return this.observationRepository.save(update)
  }

  remove(id: string) {
    return this.observationRepository.delete(new ObjectId(id))
  }
}
