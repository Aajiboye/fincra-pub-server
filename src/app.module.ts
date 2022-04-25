import { PublisherModule } from 'libs/publisher/src';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { SubscriberModule } from '@fincra/subscriber';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.PORT,
      },
    }),
    PublisherModule,
    SubscriberModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
