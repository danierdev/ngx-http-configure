import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpReconfiguredOptions } from './types';
import { HTTP_OPTION_PREFIX } from './constants';
import { selectorPredicate } from './selector-predicate';

/**
 * Re-configure a request previously configured with this library.
 * @param request The current http request
 * @param selector Apply params to array else ignore this filters
 */
export function reconfigure(request: HttpRequest<any>, selector?: string[]): HttpReconfiguredOptions {
  const predicate = selectorPredicate(selector);
  const { config, params } = request.params.keys().reduce((acc, key) => {
    const value = request.params.get(key);
    if (key.startsWith(HTTP_OPTION_PREFIX) && predicate(key)) {
      const unprefixedKey = key.replace(HTTP_OPTION_PREFIX, '');
      acc.config[unprefixedKey] = value;
    } else {
      acc.params = acc.params.set(key, value);
    }
    return acc;
  }, { config: {}, params: new HttpParams() });
  return { config, request: request.clone({ params }) };
}
