import { Controller, Post, Body, Get, Query, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // পাথটি আপনার প্রজেক্ট অনুযায়ী চেক করে নিন

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
  @ApiBearerAuth() // এটি Swagger-এ তালা আইকন দেখাবে
  @UseGuards(JwtAuthGuard) // এটি নিশ্চিত করবে যে ইউজার লগইন করা আছে
  @Patch('profile')
  @ApiOperation({ summary: 'Update my own profile' })
  updateMyProfile(@Request() req, @Body() updateData: any) {
    // req.user.sub আসছে JWT টোকেন থেকে (আপনার ইউজার আইডি)
    return this.usersService.updateProfile(req.user.sub, updateData);
  }

  // সব ইউজারদের লিস্ট দেখার জন্য
  @Get()
  @ApiOperation({ summary: 'Get all registered users (For Testing)' })
  findAll() {
    return this.usersService.findAll();
  }

  // ডোনার সার্চ করার জন্য (এটি পাবলিক রাখা হয়েছে, তালা নেই)
  @Get('search')
  @ApiOperation({ summary: 'Search for blood donors' })
  search(@Query('bloodGroup') bloodGroup: string, @Query('area') area: string) {
    return this.usersService.searchDonors(bloodGroup, area);
  }
}