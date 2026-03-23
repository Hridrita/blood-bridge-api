import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Auth & Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // new user reg
  @Post('register')
  @ApiOperation({ summary: 'Register a new donor or recipient' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //profile update logic
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiOperation({ summary: 'Update my own profile' })
  updateMyProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.sub, updateUserDto);
  }

  // to see all user list
  @Get()
  @ApiOperation({ summary: 'Get all registered users (For Testing)' })
  findAll() {
    return this.usersService.findAll();
  }

  // to search donar
  @Get('search')
  @ApiOperation({ summary: 'Search for blood donors' })
  search(@Query('bloodGroup') bloodGroup: string, @Query('area') area: string) {
    return this.usersService.searchDonors(bloodGroup, area);
  }
}
