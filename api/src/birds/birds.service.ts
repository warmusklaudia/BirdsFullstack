import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { Bird } from './entities/bird.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird) // Doesn't work
    private birdsRepository: Repository<Bird>,
  ) {}

  create(createBirdInput: CreateBirdInput): Promise<Bird> {
    const b = new Bird()
    b.name = createBirdInput.name
    b.fullname = createBirdInput.fullname
    b.category = createBirdInput.category
    b.url = createBirdInput.url
    b.observations = createBirdInput.observations
    b.description = createBirdInput.description
    return this.birdsRepository.save(b)
  }

  findAll(): Promise<Bird[]> {
    return this.birdsRepository.find()
  }

  findOne(id: string): Promise<Bird> {
    return this.birdsRepository.findOne(new ObjectId(id))
  }

  async update(id: string, updateBirdInput: UpdateBirdInput): Promise<Bird> {
    const update = new Bird()
    update.id = new ObjectId(updateBirdInput.id)
    update.name = updateBirdInput.name
    update.fullname = updateBirdInput.fullname
    update.category = updateBirdInput.category
    update.url = updateBirdInput.url
    update.observations = updateBirdInput.observations
    update.description = updateBirdInput.description

    return this.birdsRepository.save(update)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.birdsRepository.delete(new ObjectId(id))
  }

  async incrementObservation(id: string, amount = 1): Promise<void> {
    const b: Bird = await this.findOne(new ObjectId(id))
    b.observations = b.observations + amount
    await this.birdsRepository.save(b)
  }
}
