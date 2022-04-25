import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubscriptionDto {
  @ApiProperty()
  @IsString()
  topic: string;

  @ApiProperty()
  @IsString()
  url: string;
}
