import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, example: 'Arnob Sarker' })
  fullName?: string;

  @ApiProperty({ required: false, example: 'Dhaka' })
  area?: string;

  @ApiProperty({ required: false, example: '017XXXXXXXX' })
  contactNumber?: string;

  @ApiProperty({ required: false, example: 'password123' })
  password?: string;
}
