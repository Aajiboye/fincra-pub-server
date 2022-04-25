export function isValidString(value?: string, length?: number) {
  if (typeof value !== 'string') return false;

  return value.trim().length > (length || 0);
}
