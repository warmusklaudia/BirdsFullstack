import { CreateBirdInput } from '../dto/create-bird.input'
import { Bird } from '../entities/bird.entity'
import { ObjectId } from 'mongodb'

export const CreateBirdInputStub = (): CreateBirdInput => {
  const bird = new CreateBirdInput()
  bird.name = 'name'
  bird.fullname = 'fullname'
  bird.category = 'category'
  bird.url = 'url'
  bird.observations = 2
  bird.description = 'description'
  return bird
}

export const CreateBird = (): Bird => {
  const bird = new Bird()
  bird.id = new ObjectId('71c2d2f850bb93f88d02271c')
  bird.name = 'name'
  bird.fullname = 'fullname'
  bird.category = 'category'
  bird.url = 'url'
  bird.observations = 2
  bird.description = 'description'
  return bird
}
