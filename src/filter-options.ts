import { HttpParams } from '@angular/common/http';
import { HttpConfigureOptions } from './types';

export function filterOptions<T>(options: HttpConfigureOptions, predicate: (key: string) => boolean, keyPrefix: string = ''): T {
  return Object.keys(options).reduce((acc, key) => {
    if (predicate(key)) {
      const prefixedKey = `${keyPrefix}${key}`;
      let value = options[key];
      if (value instanceof HttpParams) {
        value = value.keys().reduce((p, k) => ({ ...p, [k]: value.get(k) }), {});
      }
      acc[prefixedKey] = value;
    }
    return acc;
  }, {} as T);
}
