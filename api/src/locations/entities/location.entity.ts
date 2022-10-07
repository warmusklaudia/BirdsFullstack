import { ObjectType, Field, ID } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm'
import { Observation } from 'src/observations/entities/observation.entity'

@Entity()
@ObjectType({ description: 'location' })
export class Location {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  name: string

  // @Field()
  // @Column()
  // observationsId: string

  @Field(() => [Observation], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  observations: Observation[]

  @Field()
  @Column()
  location: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
