import { Controller, Post, Body, Get, Query, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // DTO ইম্পোর্ট নিশ্চিত করুন
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Auth & Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // নতুন ইউজার রেজিস্ট্রেশন
  @Post('register')
  @ApiOperation({ summary: 'Register a new donor or recipient' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // লগইন করা ইউজারের নিজের প্রোফাইল আপডেট
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update my own profile' })
  updateMyProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    // এখানে @Body() এর পরে UpdateUserDto ব্যবহার করা হয়েছে যাতে Swagger-এ বক্স আসে
    return this.usersService.updateProfile(req.user.sub, updateUserDto);
  }

  // সব ইউজারদের লিস্ট দেখার জন্য
  @Get()
  @ApiOperation({ summary: 'Get all registered users (For Testing)' })
  findAll() {
    return this.usersService.findAll();
  }

  // ডোনার সার্চ করার জন্য
  @Get('search')
  @ApiOperation({ summary: 'Search for blood donors' })
  search(@Query('bloodGroup') bloodGroup: string, @Query('area') area: string) {
    return this.usersService.searchDonors(bloodGroup, area);
  }
}