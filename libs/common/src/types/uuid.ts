const hexGen = (size = 24) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

export class UUID {
  #id: string = hexGen(24);

  constructor(id?: string) {
    if (id) {
      this.#id = id;
    }
  }

  setId(id: string) {
    id = `${id}`;

    if (typeof id !== 'string') {
      throw new Error(`InvalidParameter: Invalid uuid passed `);
    }

    this.#id = id;

    return this;
  }

  getId() {
    return this.#id;
  }

  matches(id: string) {
    return this.#id === id;
  }

  toString() {
    return this.getId();
  }

  static generator = hexGen;
}
