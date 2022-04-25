import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DBConnectionManager {
  constructor(@InjectConnection() private connection: Connection) {}

  async disconnect() {
    await this.connection.close(true);
  }
}
