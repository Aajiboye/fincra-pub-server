import { APIResponse } from '@fincra/common/types/response';
import { SubscriptionService } from '@fincra/subscriber/application/subscription.service';
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('/v1/subscribe')
export class SubscriberController {
  constructor(private subscriberService: SubscriptionService) {}

  @Post('/:topic')
  async create(@Body() body: { url: string }, @Param('topic') topic: string) {
    const newSubscription =
      await this.subscriberService.subscribeToPublisherTopic({
        url: body.url,
        topic,
      });

    return new APIResponse(newSubscription, HttpStatus.CREATED, 'Created');
  }
}
