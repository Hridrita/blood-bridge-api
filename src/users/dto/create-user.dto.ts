import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Hridrita Saha' })
  fullName: string;

  @ApiProperty({ example: 'moon@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 'O+' })
  bloodGroup: string;

  @ApiProperty({ example: 'Dhaka' })
  area: string;

  @ApiProperty({ example: 'donor', enum: ['donor', 'recipient', 'admin'] })
  role: string;
}
