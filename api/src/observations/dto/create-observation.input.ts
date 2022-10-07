import { InputType, Field } from '@nestjs/graphql'
import { Bird } from 'src/birds/entities/bird.entity'
import { Location } from 'src/locations/entities/location.entity'

@InputType()
export class CreateObservationInput {
  @Field()
  name: string

  @Field({ nullable: true })
  userId?: string

  @Field({ nullable: true })
  weather?: string

  // @Field(() => Bird)
  // bird: Bird

  @Field()
  birdId: string

  // @Field(() => Location)
  // location: Location

  @Field()
  locationId: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
