import { InputType, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { Bird } from 'src/birds/entities/bird.entity'
import { GeoPoint } from 'src/locations/entities/geopoint.entity'
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

  @Field(() => GeoPoint, { nullable: true })
  geoPoint?: Point

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
