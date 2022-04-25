import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { QUEUECONFIG } from './constants';
import { Queue, Job } from 'bull';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
@Processor(QUEUECONFIG.NAME)
export class QueueService {
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
