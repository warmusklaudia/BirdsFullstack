import { CreateUserInput } from './create-user.input'
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql'
import { Observation } from 'src/observations/entities/observation.entity'
import { CreateObservationInput } from 'src/observations/dto/create-observation.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string

  @Field()
  uid: string

  @Field(() => [CreateObservationInput], { nullable: 'itemsAndList' }) // can return []
  observations: Observation[]

  @Field(() => Int)
  observationsCount: number
}
