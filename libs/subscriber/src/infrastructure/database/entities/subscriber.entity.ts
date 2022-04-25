import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriberEntityDocument = SubscriberEntity & Document;

@Schema({ timestamps: true })
export class SubscriberEntity {
  _id: string | Types.ObjectId;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  url: string;
}

export const subscriberEntitySchema =
  SchemaFactory.createForClass(SubscriberEntity);
