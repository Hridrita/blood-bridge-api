import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto'; // এটি ইম্পোর্ট করা নিশ্চিত করুন

@ApiTags('Auth & Users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new donor or recipient' })
  // নিচের লাইনে 'userData: any' এর বদলে 'createUserDto: CreateUserDto' লিখে দিলাম
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all registered users (For Testing)' })
  findAll() {
    return this.usersService.findAll();
  }
}