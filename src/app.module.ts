import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'marakhabo', 
      database: 'blood_bridge_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule,
  ],
})
export class AppModule {}
