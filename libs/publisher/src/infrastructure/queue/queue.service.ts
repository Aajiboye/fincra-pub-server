import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { QUEUECONFIG } from './constants';
import { Queue, Job } from 'bull';
import { PublisherService } from '@fincra/publisher/application/publish.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import axios from 'axios';
import { Result } from '@fincra/common/types/result';

@Injectable()
@Processor(QUEUECONFIG.NAME)
export class QueueService {
  private i = 1;
  constructor(
    @InjectQueue(QUEUECONFIG.NAME) private publisherQueue: Queue,
    private httpService: HttpService,
  ) {}

  async add(payload: object) {
    await this.publisherQueue.add(payload, { removeOnComplete: true });
  }

  @Process()
  async processQueue(job: Job<unknown>) {
    const response = await axios.post(job.data.subscriber, job.data.payload);
    if (response) await this.publisherQueue.getJob(job.data.id)?.remove();
  }
}
