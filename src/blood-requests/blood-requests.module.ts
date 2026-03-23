import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequestsService } from './blood-requests.service';
import { BloodRequestsController } from './blood-requests.controller';
import { BloodRequest } from './entities/blood-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodRequest])],
  controllers: [BloodRequestsController],
  providers: [BloodRequestsService],
})
export class BloodRequestsModule {}