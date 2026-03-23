import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './entities/blood-request.entity';

@Injectable()
export class BloodRequestsService {
  constructor(
    @InjectRepository(BloodRequest)
    private bloodRequestRepository: Repository<BloodRequest>,
  ) {}

  // কন্টাক্ট নাম্বার ভ্যালিডেশন ফাংশন
  private validateContactNumber(num: string) {
    const regex = /^01[3-9]\d{8}$/; // বাংলাদেশি ১১ ডিজিট ফরম্যাট
    if (!regex.test(num)) {
      throw new BadRequestException(`Invalid contact number: ${num}. It must be 11 digits.`);
    }
  }

  // সিঙ্গেল অথবা একাধিক (Bulk) রিকোয়েস্ট তৈরি
  async create(data: any, user: any) {
    const userId = user.sub;

    if (Array.isArray(data)) {
      const requests = data.map((item) => {
        this.validateContactNumber(item.contactNumber); // ভ্যালিডেশন চেক
        return {
          ...item,
          requester: { id: userId },
        };
      });
      return await this.bloodRequestRepository.save(requests as any);
    }

    this.validateContactNumber(data.contactNumber); // ভ্যালিডেশন চেক
    const newRequest = this.bloodRequestRepository.create({
      ...data,
      requester: { id: userId },
    });
    return await this.bloodRequestRepository.save(newRequest);
  }

  // সব ব্লাড রিকোয়েস্ট দেখার লজিক (২য় কলামে নাম সেট করা)
  async findAll() {
    const requests = await this.bloodRequestRepository.find({
      relations: ['requester'], // ইউজার টেবিল থেকে ডাটা আনা
      order: { id: 'DESC' },
    });

    // ডাটা ফরম্যাট করে requesterId সরিয়ে Name বসানো
    return requests.map((req) => ({
      id: req.id,
      requesterName: req.requester ? req.requester.fullName : 'System User', // ২য় কলামে নাম
      bloodGroup: req.bloodGroup,
      hospitalName: req.hospitalName,
      location: req.location,
      contactNumber: req.contactNumber,
      status: req.status,
      createdAt: req.createdAt,
    }));
  }

  // শুধুমাত্র নিজের রিকোয়েস্টগুলো দেখা
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

  // রিকোয়েস্ট ডিলিট করা
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