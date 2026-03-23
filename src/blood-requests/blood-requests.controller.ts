import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { BloodRequestsService } from './blood-requests.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateBloodRequestDto } from './dto/create-blood-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // এটি আমরা একটু পর বানাবো

@ApiTags('Blood Requests')
@ApiBearerAuth() // এটি Swagger-এ তালা আইকন দেখাবে
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @UseGuards(JwtAuthGuard) // এই সেই তালা!
  @Post()
  @ApiOperation({ summary: 'Create a blood request' })
  create(@Body() createDto: CreateBloodRequestDto, @Request() req) {
    return this.bloodRequestsService.create(createDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blood requests' })
  findAll() {
    return this.bloodRequestsService.findAll();
  }
}