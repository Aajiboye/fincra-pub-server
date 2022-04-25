import { validateAndError } from '@fincra/common/functions/validate';
import { UUID } from '@fincra/common/types/uuid';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SubscriptionDto } from '../dtos/subscriber.dto';
import { SubscriptionRepo } from '../infrastructure/database/repos/subscription.repo';

@Injectable()
export class SubscriptionService {
  constructor(private subRepo: SubscriptionRepo, private log: Logger) {}

  async subscribeToPublisherTopic(subscriptionData: SubscriptionDto) {
    await validateAndError(subscriptionData);
    const checkSubscription = await this.subRepo.getSubscriptionBySubscriber(
      subscriptionData,
    );
    if (checkSubscription)
      throw new BadRequestException(
        `Subscriber ${subscriptionData.url} already subscribed to the topic: ${subscriptionData.topic}`,
      );
    const result = await this.subRepo.createSubscription({
      _id: UUID.generator(),
      ...subscriptionData,
    });

    if (result.isFailure) throw result.getError();

    return result.getValue();
  }
}
