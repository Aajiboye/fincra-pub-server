import { DBConnectionManager } from '@fincra/common/database/db.connection.test';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  let dbConnection: DBConnectionManager;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        TerminusModule,
        MongooseModule.forRoot(process.env.DATABASE_URL),
      ],
      controllers: [AppController],
      providers: [AppService, DBConnectionManager],
    }).compile();

    dbConnection = app.get<DBConnectionManager>(DBConnectionManager);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  // ALWAYS SKIP
  xdescribe('healthChecks', () => {
    it('should return health checks', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.healthChecks()).toBeDefined();
    });
  });
});
