import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  // user registration
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

    // using await to ensure that the data saved in database
    const savedUser = (await this.usersRepository.save(newUser)) as any;

    const { password: _, ...result } = savedUser;
    return result;
  }

  // profile update logic
  async updateProfile(id: number, updateData: any) {
    if (!id) {
      throw new BadRequestException('User ID is required for update!');
    }

    // if user exit or not check
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // pass update with hash
    if (updateData.password && updateData.password.trim() !== '') {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    delete updateData.id;
    delete updateData.email;

    // update datbase
    await this.usersRepository.update(id, updateData);

    // after update return new data
    return await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'fullName',
        'email',
        'bloodGroup',
        'area',
        'role',
        'contactNumber',
      ],
    });
  }

  // to see all user
  async findAll(): Promise<any[]> {
    return await this.usersRepository.find({
      select: [
        'id',
        'fullName',
        'email',
        'bloodGroup',
        'area',
        'role',
        'contactNumber',
      ],
    });
  }

  //find user using email
  async findByEmail(email: string): Promise<any> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  // doner serach logic
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
      select: [
        'id',
        'fullName',
        'bloodGroup',
        'area',
        'email',
        'contactNumber',
      ],
    });
  }
}
