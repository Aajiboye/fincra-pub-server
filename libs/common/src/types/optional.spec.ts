import { Optional } from './optional';

describe(`Optional Type`, () => {
  it(`should confirm that the value is present`, () => {
    expect(Optional.of(false).isPresent).toBe(true);
  });

  it(`should throw error, when trying to get value when absent in the type`, () => {
    expect(() => Optional.of(null).getValue()).toThrow();
  });
});
