import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class PublisherDTO {
  @ApiProperty()
  @IsString()
  topic: string;

  @ApiProperty()
  @IsObject()
  payload: object;
}

export class QueueDataDTO extends PublisherDTO {
  @ApiProperty()
  subscriber: string;
}
