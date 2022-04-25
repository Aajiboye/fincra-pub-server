import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  public static readonly MAX_MEMORY_USAGE = 150 * 1024 * 1024;

  constructor(
    private health: HealthCheckService,
    private mongoDB: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  healthStatus() {
    return this.health.check([
      () => this.memory.checkHeap('memory', AppService.MAX_MEMORY_USAGE),
      () => this.mongoDB.pingCheck('mongodb', { timeout: 1500 }),
      () =>
        this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.7 }),
    ]);
  }
}
