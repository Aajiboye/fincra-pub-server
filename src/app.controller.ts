import { APIResponse } from '@fincra/common/types/response';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index() {
    const indexData = {
      serviceName: `${process.env.APP_NAME}`,
      environment: `${process.env.NODE_ENV}`,
      uptime: Number(process.uptime()),
      platform: process.platform,
    };

    return APIResponse.ok(indexData);
  }

  @Get('/health-status')
  @HealthCheck()
  healthChecks() {
    return this.appService.healthStatus();
  }
}
