import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { isValidString } from '../functions/stringHelper';

export enum MongoDBErrorCodes {
  DUPLICATE_EXCEPTION = 11000,
}

export interface MongoDBError extends Error {
  code: MongoDBErrorCodes;
  index: 0;
  keyPattern: Record<string, number>;
  keyValue: Record<string, unknown>;
  message: string;
}

export class MongoHttpExceptionMapper {
  static createHttpException(error: MongoDBError) {
    switch (error.code) {
      case MongoDBErrorCodes.DUPLICATE_EXCEPTION:
        return MongoHttpExceptionMapper.mapDuplicateException(error);

      default:
        return new InternalServerErrorException();
    }
  }

  static mapDuplicateException(error: MongoDBError) {
    const items = Object.entries(error.keyValue).reduce(
      (prev, curr) =>
        `${isValidString(prev) ? prev + ',' : ''} ${curr[0]}: ${curr[1]}`,
      '',
    );

    return new HttpException(
      `Unique Key ${items} already exists.`,
      HttpStatus.CONFLICT,
    );
  }
}
