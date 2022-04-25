import { DBConnectionManager } from '@fincra/common/database/db.connection.test';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PublisherDTO } from '../dtos/publishMessage.dto';
import { PublisherModule } from '../publisher.module';
import { PublisherService } from './publish.service';

describe('Subscription service', () => {
  let publisherService: PublisherService;

  let dbConnection: DBConnectionManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublisherService, DBConnectionManager],
      imports: [
        PublisherModule,
        HttpModule,
        MongooseModule.forRoot(process.env.DATABASE_URL),
      ],
    }).compile();

    publisherService = module.get<PublisherService>(PublisherService);

    dbConnection = module.get<DBConnectionManager>(DBConnectionManager);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  it('should publish payload to all subscribers to a topic ', async () => {
    const publishData: PublisherDTO = {
      topic: 'topic1',
      payload: {
        msg: 'Hello Test',
      },
    };

    const subscribers = await publisherService.publishToTopic(publishData);
    expect(subscribers).toBeDefined();
  });
});
