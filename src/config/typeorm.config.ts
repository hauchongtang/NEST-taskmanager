import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '[::1]',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}