import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth & Users') // এটি Swagger-এ সেকশন তৈরি করবে
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new donor or recipient' })
  register(@Body() userData: any) {
    return this.usersService.create(userData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all registered users (For Testing)' })
  findAll() {
    return this.usersService.findAll();
  }
}