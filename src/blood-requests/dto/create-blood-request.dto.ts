import { ApiProperty } from '@nestjs/swagger';

export class CreateBloodRequestDto {
  @ApiProperty({ example: 'B+' })
  bloodGroup: string;

  @ApiProperty({ example: 'Apollo Hospital' })
  hospitalName: string;

  @ApiProperty({ example: 'Dhaka' })
  location: string;

  @ApiProperty({ example: '01712345678' })
  contactNumber: string;
}