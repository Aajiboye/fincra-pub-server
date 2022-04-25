import { SubscriberModule } from '@fincra/subscriber';
import { SubscriptionRepo } from '@fincra/subscriber/infrastructure/database/repos/subscription.repo';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { PublisherService } from './application/publish.service';
import { PublisherController } from './infrastructure/controllers/publisher.controller';
import { QUEUECONFIG } from './infrastructure/queue/constants';
import { QueueService } from './infrastructure/queue/queue.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SubscriberModule,
    BullModule.registerQueue({ name: QUEUECONFIG.NAME }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [PublisherService, SubscriptionRepo, QueueService, Logger],
  exports: [PublisherService, SubscriptionRepo, QueueService, Logger],
  controllers: [PublisherController],
})
export class PublisherModule {}
