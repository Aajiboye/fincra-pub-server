import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

export function castToMongoId(id: string) {
  try {
    return new Types.ObjectId(id);
  } catch (error) {
    console.error(error);
    throw new HttpException(
      `InvalidParameter: ID provided is not valid. `,
      HttpStatus.BAD_REQUEST,
    );
  }
}
