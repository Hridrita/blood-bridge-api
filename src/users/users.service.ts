import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm'; // Like ইম্পোর্ট করা হয়েছে সার্চের জন্য
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // নতুন ইউজার রেজিস্ট্রেশন (পাসওয়ার্ড হ্যাশিং সহ)
  async create(userData: any): Promise<any> {
    const { email, password } = userData;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.usersRepository.save(newUser);
  }

  // সব ইউজারদের লিস্ট দেখার জন্য
  async findAll(): Promise<any[]> {
    return await this.usersRepository.find();
  }

  // ইমেইল দিয়ে ইউজার খোঁজা (লগইনের সময় কাজে লাগে)
  async findByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  /**
   * ব্লাড গ্রুপ এবং এরিয়া অনুযায়ী ডোনার সার্চ করার লজিক
   * এখানে শুধু তাদেরই দেখাবে যাদের role 'donor'
   */
  async searchDonors(bloodGroup?: string, area?: string) {
    const query: any = { role: 'donor' }; 

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (area) {
      // Like('%area%') ব্যবহার করার ফলে 'Dhaka' লিখলে 'South Dhaka' ও খুঁজে পাবে
      query.area = Like(`%${area}%`); 
    }

    return this.usersRepository.find({
      where: query,
      // পাসওয়ার্ড বাদে গুরুত্বপূর্ণ তথ্যগুলো শুধু দেখাবে
      select: ['id', 'fullName', 'bloodGroup', 'area', 'email'] 
    });
  }
}