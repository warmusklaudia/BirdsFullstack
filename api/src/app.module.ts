import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlConfig } from './bootstrap/graphQLConfig'
import { typeORMConfig } from './bootstrap/typeORMConfig'
import { BirdsModule } from './birds/birds.module'
import { ObservationsModule } from './observations/observations.module'
import { LocationsModule } from './locations/locations.module'
import { DatabaseSeedModule } from './seed/seed.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // TODO: Enhancement? move to async provider
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    BirdsModule,
    ObservationsModule,
    LocationsModule,
    DatabaseSeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
