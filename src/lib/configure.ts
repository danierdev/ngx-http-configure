import { HttpParams, HttpRequest } from '@angular/common/http';
import { HTTP_OPTION_PREFIX, HTTP_OPTIONS_KEYS, HttpConfigureOptions, HttpOptions, HttpReconfiguredOptions } from './models';
import { deepCopy, isObject } from './utils';

/**
 * Configure the http client options tu extend functionality and use in interceptors.
 * @param configs Set of extended http client options
 */
export function configure(configs: HttpConfigureOptions): HttpOptions {
  const options = deepCopy(configs) as HttpOptions;
  Object.keys(options).forEach(key => {
    if (!HTTP_OPTIONS_KEYS.includes(key)) {
      const prefixedKey = `${HTTP_OPTION_PREFIX}${key}`;
      if (options.params instanceof HttpParams) {
        options.params = options.params.set(prefixedKey, options[key]);
      } else {
        options.params = isObject(options.params) ? options.params : {};
        options.params[prefixedKey] = options[key];
      }
      delete options[key];
    }
  });
  return options;
}

/**
 * Re-configure a request previously configured with this library.
 * @param request The current http request
 * @param selector Apply params to array else ignore this filters
 */
export function reconfigure(request: HttpRequest<any>, selector?: string[]): HttpReconfiguredOptions {
  let params = request.params;
  const config = {};
  const predicate = key => (Array.isArray(selector) && !!selector.length
    ? selector.map(el => `${HTTP_OPTION_PREFIX}${el}`).includes(key)
    : true);
  params.keys().forEach(key => {
    if (key.startsWith(HTTP_OPTION_PREFIX) && predicate(key)) {
      config[key.replace(HTTP_OPTION_PREFIX, '')] = params.get(key);
      params = params.delete(key);
    }
  });
  request = request.clone({ params });
  return { config, request };
}
