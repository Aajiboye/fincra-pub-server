export function fieldMask(field: string | number) {
  let string = Array.from(`${field}`);

  if (string.length < 3) {
    return '***';
  }

  string = string.fill('*', 0, string.length - 3);

  return (string = string.toString() as any).replaceAll(',', '');
}
