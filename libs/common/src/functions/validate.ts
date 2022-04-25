import { BadRequestException, HttpException } from '@nestjs/common';
import {
  validate,
  ValidationError,
  ValidatorOptions,
  validateSync,
} from 'class-validator';

export async function validateAndError(data: any, options?: ValidatorOptions) {
  const errors = await validate(data, options);
  extractAndThrowError(errors);
}

export function validateSyncAndError(data: any, options?: ValidatorOptions) {
  const errors = validateSync(data, options);
  extractAndThrowError(errors);
}

export function extractAndThrowError(errors: ValidationError[]) {
  if (errors.length > 1) {
    const payload = errors.map((e) => {
      const key = Object.keys(e.constraints || {})[0];
      return {
        property: e.property,
        error: key ? e.constraints[key] : '',
      };
    });

    throw new BadRequestException({
      message: `Please incorrect fields was passed, please check and try again`,
      fields: payload,
      statusCode: 400,
    });
  }
}

export function extractValidationException(errors: ValidationError[]) {
  let exception: HttpException;

  if (errors.length > 0) {
    const payload = errors.map((e) => {
      const key = Object.keys(e.constraints || {})[0];
      return {
        property: e.property,
        error: key ? e.constraints[key] : '',
      };
    });

    exception = new BadRequestException({
      message: `Please incorrect fields was passed, please check and try again`,
      fields: payload,
      statusCode: 400,
    });
  }

  return exception;
}
