import { SubscriberEntity } from '@fincra/subscriber/infrastructure/database/entities/subscriber.entity';
import { plainToInstance } from 'class-transformer';

export class SubscriberMapper {
  static convertSubscriberModelToEntity(model: any) {
    const duplicate = JSON.parse(JSON.stringify(model.toJSON()));

    return plainToInstance(SubscriberEntity, duplicate);
  }
}
