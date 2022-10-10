import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsResolver } from './locations.resolver'
import { Location } from './entities/location.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ObservationsService } from 'src/observations/observations.service'
import { Observation } from 'src/observations/entities/observation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Location, Observation])],
  providers: [ObservationsService, LocationsResolver, LocationsService],
})
export class LocationsModule {}
