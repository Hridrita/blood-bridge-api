import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BloodRequestsModule } from './blood-requests/blood-requests.module'; // এটিও যোগ করুন
import { User } from './users/entities/user.entity';
import { BloodRequest } from './blood-requests/entities/blood-request.entity'; // এই সেই লাইন!

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'marakhabo', // আপনার পাসওয়ার্ড
      database: 'blood_bridge_db',
      entities: [User, BloodRequest], // এখন আর এরর দিবে না
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BloodRequestsModule, // মডিউলটিও এখানে থাকতে হবে
  ],
})
export class AppModule {}