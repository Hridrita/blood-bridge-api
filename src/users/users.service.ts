import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm'; 
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // নতুন ইউজার রেজিস্ট্রেশন
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

    const savedUser = await this.usersRepository.save(newUser) as any;

// এখন খুব সহজেই পাসওয়ার্ড বাদ দিয়ে বাকিটা রিটার্ন করতে পারবেন
const { password: _, ...result } = savedUser; 
return result;
  }

  // প্রোফাইল আপডেট করার লজিক
  async updateProfile(id: number, updateData: any) {
    // ১. ইউজার আছে কি না চেক করা
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // ২. পাসওয়ার্ড আপডেট করতে চাইলে হ্যাশ করা
    if (updateData.password && updateData.password.trim() !== '') {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password; 
    }

    // ৩. সেনসিটিভ ফিল্ড আপডেট হওয়া থেকে আটকানো
    delete updateData.id;
    delete updateData.email; 

    await this.usersRepository.update(id, updateData);

    // আপডেট শেষে নতুন ডাটা রিটার্ন
    return await this.usersRepository.findOne({ 
      where: { id },
      select: ['id', 'fullName', 'email', 'bloodGroup', 'area', 'role'] 
    });
  }

  // সব ইউজার দেখার জন্য
  async findAll(): Promise<any[]> {
    return await this.usersRepository.find({
        select: ['id', 'fullName', 'email', 'bloodGroup', 'area', 'role']
    });
  }

  // ইমেইল দিয়ে ইউজার খোঁজা
  async findByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // ডোনার সার্চ করার লজিক
  async searchDonors(bloodGroup?: string, area?: string) {
    const query: any = { role: 'donor' }; 

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    if (area) {
      query.area = Like(`%${area}%`); 
    }

    return this.usersRepository.find({
      where: query,
      select: ['id', 'fullName', 'bloodGroup', 'area', 'email'] 
    });
  }
}