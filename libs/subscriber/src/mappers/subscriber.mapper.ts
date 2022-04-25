import { plainToInstance } from 'class-transformer';
import { SubscriberEntity } from '../infrastructure/database/entities/subscriber.entity';

export class SubscriberMapper {
  static convertSubscriberModelToEntity(model: any) {
    const duplicate = JSON.parse(JSON.stringify(model.toJSON()));

    return plainToInstance(SubscriberEntity, duplicate);
  }
}
