import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Location } from 'src/locations/entities/location.entity'
import { Observation } from './entities/observation.entity'
import { LocationsService } from 'src/locations/locations.service'
import { NotificationsModule } from 'src/notifications/notifications.module'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Location, Observation]), NotificationsModule],
  providers: [BirdsService, LocationsService, ObservationsResolver, ObservationsService],
})
export class ObservationsModule {}
