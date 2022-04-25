import { MongoHttpExceptionMapper } from '@fincra/common/database/exception-mapper';
import { Result } from '@fincra/common/types/result';
import { SubscriberMapper } from '@fincra/subscriber/mappers/subscriber.mapper';
import { SubscriptionDto } from '@fincra/subscriber/dtos/subscriber.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import {
  SubscriberEntity,
  SubscriberEntityDocument,
} from '../entities/subscriber.entity';

@Injectable()
export class SubscriptionRepo {
  constructor(
    @InjectModel(SubscriberEntity.name)
    private subscriberModel: Model<SubscriberEntityDocument>,
    private logger: Logger,
  ) {}

  async createSubscription(
    newSubscription: SubscriberEntity,
  ): Promise<Result<SubscriberEntity, Error>> {
    if (!(newSubscription instanceof SubscriberEntity)) {
      newSubscription = plainToInstance(
        SubscriberEntity,
        newSubscription,
      ) as unknown as SubscriberEntity;
    }

    try {
      const model = await new this.subscriberModel(newSubscription).save();
      return Result.ok(SubscriberMapper.convertSubscriberModelToEntity(model));
    } catch (error) {
      this.logger.error(
        `Error occurred while attempting to save ${JSON.stringify(
          newSubscription,
        )} \n`,
        error,
      );

      return Result.fail(MongoHttpExceptionMapper.createHttpException(error));
    }
  }

  async getSubscriptionBySubscriber(
    subscriberData: SubscriptionDto,
  ): Promise<Result<SubscriberEntity, Error>> {
    const { url, topic } = subscriberData;
    return this.subscriberModel.findOne({ url, topic });
  }

  async deleteById(id: string) {
    await this.subscriberModel.deleteOne({ _id: id });

    return true;
  }

  async getSubscribersByTopic(topic: string) {
    return this.subscriberModel.find({ topic });
  }
}
