export class Optional<T> {
  #isPresent = false;

  constructor(private value?: T, private error?: Error) {
    if (typeof value === 'boolean') {
      this.#isPresent = true;
    } else {
      this.#isPresent = !!value;
    }
  }

  get isPresent(): boolean {
    return this.#isPresent;
  }

  get isEmpty(): boolean {
    return !this.#isPresent;
  }

  /**
   * Guards against the value been null or undefined when retrieving the value
   */
  getValue(): T {
    const error = this.error || new Error(`Value not present in optional type`);

    if (this.#isPresent) {
      return this.value;
    }

    throw error;
  }

  /**
   * No validation to retrieve value against undefined o null
   */
  getRaw() {
    return this.value;
  }

  orElse<E = T>(value: E) {
    if (this.#isPresent) {
      return this.value;
    }
    return value;
  }

  static of<T>(value?: T, error?: Error): Optional<T> {
    return new Optional(value, error);
  }
}
