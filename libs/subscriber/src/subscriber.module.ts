import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from './application/subscription.service';
import { SubscriberController } from './infrastructure/controllers/subscriber.controller';
import {
  SubscriberEntity,
  subscriberEntitySchema,
} from './infrastructure/database/entities/subscriber.entity';
import { SubscriptionRepo } from './infrastructure/database/repos/subscription.repo';
const mongooseModule = MongooseModule.forFeature([
  {
    name: SubscriberEntity.name,
    schema: subscriberEntitySchema,
  },
]);
@Module({
  imports: [mongooseModule],
  providers: [SubscriptionService, SubscriptionRepo, Logger],
  exports: [SubscriptionService, SubscriptionRepo, Logger, mongooseModule],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
