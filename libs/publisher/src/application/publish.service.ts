import { validateAndError } from '@fincra/common/functions/validate';
import { SubscriptionRepo } from '@fincra/subscriber/infrastructure/database/repos/subscription.repo';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PublisherDTO, QueueDataDTO } from '../dtos/publishMessage.dto';
import { QueueService } from '../infrastructure/queue/queue.service';

@Injectable()
export class PublisherService {
  constructor(
    private subRepo: SubscriptionRepo,
    private log: Logger,
    private queueService: QueueService,
    private httpService: HttpService,
  ) {}
  /**
   * name
   */
  public async publishToTopic(publisherData: PublisherDTO) {
    // get all subscriber to topic
    await validateAndError(publisherData);
    const { topic, payload } = publisherData;
    const allSubscribers = await this.subRepo.getSubscribersByTopic(topic);
    if (allSubscribers.length !== 0) {
      // push to queue
      allSubscribers.forEach((subscriber) => {
        const queueData: QueueDataDTO = {
          topic,
          subscriber: subscriber.url,
          payload,
        };
        this.queueService.add(queueData);
      });
    }
    return {};
  }

  public sendRequest(queueData: QueueDataDTO): Observable<AxiosResponse> {
    // get all subscriber to topic
    return this.httpService.post(queueData.subscriber, queueData.payload);
  }
}
