export function isObject(val: object): boolean {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
