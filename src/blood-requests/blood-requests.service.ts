import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './entities/blood-request.entity';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private bloodRequestRepository: Repository<BloodRequest>,
  ) {}

  create(createDto: any, user: any) {
    const newRequest = this.bloodRequestRepository.create({
      ...createDto,
      requester: { id: user.sub }, // JWT থেকে আসা ইউজার আইডি
    });
    return this.bloodRequestRepository.save(newRequest);
  }

  findAll() {
    return this.bloodRequestRepository.find({ relations: ['requester'] });
  }
}