import { APIResponse } from '@fincra/common/types/response';
import { PublisherService } from '@fincra/publisher/application/publish.service';
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publishes')
@Controller('/v1/publish')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Post('/:topic')
  async publishToTopic(@Body() payload: object, @Param('topic') topic: string) {
    const acknowledgement = await this.publisherService.publishToTopic({
      payload,
      topic,
    });

    return new APIResponse(acknowledgement, HttpStatus.OK, 'Published');
  }
}
