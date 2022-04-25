import { HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels(APIResponse)
export class APIResponse<T> {
  @ApiProperty()
  isSuccessful = false;

  @ApiProperty()
  data: T;

  @ApiProperty()
  message: string;

  public readonly statusCode: HttpStatus = HttpStatus.OK;

  constructor(data: T, statusCode = HttpStatus.OK, message: string) {
    this.data = data;
    this.statusCode = statusCode;
    if (message) {
      this.message = message;
    }

    this.isSuccessful = statusCode >= 200 && statusCode <= 302;

    Object.freeze(this);
  }

  static ok<T>(data: T) {
    return new APIResponse(data, HttpStatus.OK, 'Success');
  }

  static badRequest<T>(data: T, message: string) {
    return new APIResponse(null, HttpStatus.BAD_REQUEST, message);
  }
}

@ApiExtraModels(PaginatedResult)
export class PaginatedResult<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  pageNumber: number;
}
