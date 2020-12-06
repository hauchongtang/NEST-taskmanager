import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot(typeormConfig),
  ],
})
export class AppModule { }
