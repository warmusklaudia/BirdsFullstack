import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27027/api',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // be careful
  useNewUrlParser: true,
  useUnifiedTopology: true, // disable deprecated warnings
}
