export class Result<T, E extends Error> {
  constructor(private _error: E, private _value?: T) {
    if (_value && _error) {
      throw new Error(
        `InvalidOperation: A result can not have both error and value`,
      );
    }

    if (!_value && !_error) {
      throw new Error(
        `InvalidOperation: A result must have either an error and value`,
      );
    }
  }

  getValue() {
    if (this.isSuccess) {
      return this._value;
    }

    throw new Error(`InvalidOperation: use getError instead`);
  }

  getError() {
    if (this.isFailure) {
      return this._error;
    }

    throw new Error(`InvalidOperation: use getValue instead`);
  }

  get isSuccess() {
    return !!this._value;
  }

  get isFailure() {
    return !!this._error;
  }

  static ok<T>(value: T) {
    return new Result(null, value);
  }

  static fail<E extends Error>(value: E) {
    return new Result(value, null);
  }

  static wrapFunction<T>(func: () => T): Result<T, Error> {
    try {
      return Result.ok(func());
    } catch (error) {
      return Result.fail(error);
    }
  }

  static async fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
    try {
      return Result.ok(await promise);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
