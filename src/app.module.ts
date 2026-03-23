import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BloodRequestsModule } from './blood-requests/blood-requests.module';
import { User } from './users/entities/user.entity';
import { BloodRequest } from './blood-requests/entities/blood-request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'marakhabo',
      database: 'blood_bridge_db',
      entities: [User, BloodRequest],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BloodRequestsModule,
  ],
})
export class AppModule {}
