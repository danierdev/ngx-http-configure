import { HttpConfigureOptions, HttpOptions } from './types';
import { HTTP_OPTION_PREFIX, HTTP_OPTIONS_KEYS } from './constants';
import { filterOptions } from './filter-options';

/**
 * Configure the http client options tu extend functionality and use in interceptors.
 * @param options Set of extended http client options
 */
export function configure(options: HttpConfigureOptions): HttpOptions {
  const safeOptions = filterOptions<HttpOptions>(options, (key) => HTTP_OPTIONS_KEYS.includes(key));
  const extraParams = filterOptions(options, (key) => !HTTP_OPTIONS_KEYS.includes(key), HTTP_OPTION_PREFIX);
  safeOptions.params = {...safeOptions.params, ...extraParams};
  return safeOptions;
}
