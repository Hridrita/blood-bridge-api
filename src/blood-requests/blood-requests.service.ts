import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './entities/blood-request.entity';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private bloodRequestRepository: Repository<BloodRequest>,
  ) {}

  //contact no validation function
  private validateContactNumber(num: string) {
    const regex = /^01[3-9]\d{8}$/;
    if (!regex.test(num)) {
      throw new BadRequestException(
        `Invalid contact number: ${num}. It must be 11 digits.`,
      );
    }
  }

  //single or more bulk ready
  async create(data: any, user: any) {
    const userId = user.sub;

    if (Array.isArray(data)) {
      const requests = data.map((item) => {
        this.validateContactNumber(item.contactNumber); //validation
        return {
          ...item,
          requester: { id: userId },
        };
      });
      return await this.bloodRequestRepository.save(requests as any);
    }

    this.validateContactNumber(data.contactNumber);
    const newRequest = this.bloodRequestRepository.create({
      ...data,
      requester: { id: userId },
    });
    return await this.bloodRequestRepository.save(newRequest);
  }

  //to see all blood request
  async findAll() {
    const requests = await this.bloodRequestRepository.find({
      relations: ['requester'], //fetch data from user table
      order: { id: 'DESC' },
    });

    return requests.map((req) => ({
      id: req.id,
      requesterName: req.requester ? req.requester.fullName : 'System User',
      bloodGroup: req.bloodGroup,
      hospitalName: req.hospitalName,
      location: req.location,
      contactNumber: req.contactNumber,
      status: req.status,
      createdAt: req.createdAt,
    }));
  }

  //to see own request
  async findMyRequests(userId: number) {
    const requests = await this.bloodRequestRepository.find({
      where: { requester: { id: userId } },
      relations: ['requester'],
      order: { id: 'DESC' },
    });

    return requests.map((req) => ({
      id: req.id,
      requesterName: req.requester ? req.requester.fullName : 'Me',
      bloodGroup: req.bloodGroup,
      hospitalName: req.hospitalName,
      location: req.location,
      contactNumber: req.contactNumber,
      status: req.status,
      createdAt: req.createdAt,
    }));
  }

  //request delete
  async remove(id: number, userId: number) {
    const request = await this.bloodRequestRepository.findOne({
      where: { id, requester: { id: userId } },
    });

    if (!request) {
      throw new NotFoundException(
        'Blood request not found or you are not authorized to delete this!',
      );
    }

    await this.bloodRequestRepository.remove(request);
    return { message: `Request with ID ${id} deleted successfully` };
  }
}
