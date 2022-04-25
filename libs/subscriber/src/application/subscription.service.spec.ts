import { DBConnectionManager } from '@fincra/common/database/db.connection.test';
import { BadRequestException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionDto } from '../dtos/subscriber.dto';
import { SubscriberEntity } from '../infrastructure/database/entities/subscriber.entity';
import { SubscriberModule } from '../subscriber.module';
import { SubscriptionService } from './subscription.service';

describe('Subscription service', () => {
  let subscriptionService: SubscriptionService;

  let dbConnection: DBConnectionManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionService, DBConnectionManager],
      imports: [
        SubscriberModule,
        MongooseModule.forRoot(process.env.DATABASE_URL),
      ],
    }).compile();

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);

    dbConnection = module.get<DBConnectionManager>(DBConnectionManager);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  it('should add a new subscription to topic', async () => {
    const subscriptionRequest: SubscriptionDto = {
      topic: 'topic1',
      url: 'http://localhost:3000/test2',
    };

    const newSub = await subscriptionService.subscribeToPublisherTopic(
      subscriptionRequest,
    );
    expect(newSub).toBeInstanceOf(SubscriberEntity);
  });

  it('should throw duplicate subscription error', async () => {
    const subscriptionRequest: SubscriptionDto = {
      topic: 'topic1',
      url: 'http://localhost:3000/test1',
    };
    try {
      await subscriptionService.subscribeToPublisherTopic(subscriptionRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
