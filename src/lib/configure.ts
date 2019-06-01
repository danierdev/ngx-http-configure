import { HttpParams, HttpRequest } from '@angular/common/http';
import { HTTP_OPTION_PREFIX, HTTP_OPTIONS_KEYS, HttpConfigureOptions, HttpOptions, HttpReconfiguredOptions } from './models';
import { deepCopy, isObject } from './utils';

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

export function reconfigure(request: HttpRequest<any>): HttpReconfiguredOptions {
  let params = request.params;
  const config = {};
  params.keys().forEach(key => {
    if (key.startsWith(HTTP_OPTION_PREFIX)) {
      config[key.replace(HTTP_OPTION_PREFIX, '')] = params.get(key);
      params = params.delete(key);
    }
  });
  request = request.clone({ params });
  return { config, request };
}


