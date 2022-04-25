import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublisherEntityDocument = PublisherEntity & Document;

@Schema({ timestamps: true })
export class PublisherEntity {
  _id: string | Types.ObjectId;

  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  url: string;
}

export const subscriberEntitySchema =
  SchemaFactory.createForClass(PublisherEntity);
