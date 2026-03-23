import { IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBloodRequestDto {
  @ApiProperty({ example: 'O+' })
  @IsNotEmpty()
  @IsString()
  bloodGroup: string;

  @ApiProperty({ example: 'Dhaka Medical College' })
  @IsNotEmpty()
  @IsString()
  hospitalName: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: '01712345678' })
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'Contact number must be exactly 11 digits' })
  @Matches(/^01[3-9]\d{8}$/, { message: 'Invalid Bangladeshi contact number' })
  contactNumber: string;
}
