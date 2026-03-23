import { Controller, Post, Body, Get, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { BloodRequestsService } from './blood-requests.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateBloodRequestDto } from './dto/create-blood-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Blood Requests')
@ApiBearerAuth()
@Controller('blood-requests')
export class BloodRequestsController {
  constructor(private readonly bloodRequestsService: BloodRequestsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create single or multiple blood requests' })
  // Swagger-এ যাতে অ্যারে ইনপুট দেওয়ার বক্স আসে তার জন্য ApiBody যোগ করা হয়েছে
  @ApiBody({ 
    type: CreateBloodRequestDto, 
    isArray: true,
    description: 'Send a single object or an array of objects' 
  })
  create(@Body() createDto: any, @Request() req) {
    // এখানে টাইপ 'any' রাখা হয়েছে যাতে এটি Array এবং Object উভয়ই গ্রহণ করতে পারে
    return this.bloodRequestsService.create(createDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blood requests' })
  findAll() {
    return this.bloodRequestsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-requests')
  @ApiOperation({ summary: 'Get current user requests' })
  findMyRequests(@Request() req) {
    return this.bloodRequestsService.findMyRequests(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blood request' })
  remove(@Param('id') id: string, @Request() req) {
    return this.bloodRequestsService.remove(+id, req.user.sub);
  }
}