import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput): Promise<User> {
    const u = new User()
    u.uid = createUserInput.uid
    return this.userRepository.save(u)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(new ObjectId(id))
  }

  update(updateUserInput: UpdateUserInput) {
    const update = new User()
    update.id = new ObjectId(updateUserInput.id)
    update.uid = updateUserInput.uid
    update.observations = updateUserInput.observations
    update.observationsCount = updateUserInput.observationsCount
    return this.userRepository.save(update)
  }

  remove(id: string) {
    return this.userRepository.delete(new ObjectId(id))
  }
}
