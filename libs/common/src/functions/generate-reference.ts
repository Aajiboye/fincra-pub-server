import { v4 as uuid } from 'uuid';

export function generateReference(length: number, ...splits: string[]) {
  const random = (uuid() as string).slice(0, length);

  const identifiers = splits.reduce(
    (prev, curr) => `${prev}-${curr}`.trim(),
    'ISTBL',
  );

  return `${identifiers}-${random}`.replace('--', '-').toUpperCase();
}

export function generatePrefixedReference(
  prefix: string,
  length: number,
  ...splits: string[]
) {
  const random = (uuid() as string).slice(0, length);

  const identifiers = splits.reduce(
    (prev, curr) => `${prev}-${curr}`.trim(),
    prefix,
  );

  return `${identifiers}-${random}`.replace('--', '-').toUpperCase();
}
