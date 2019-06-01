import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

type HttpObserve = 'body' | 'events' | 'response' ;

type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text' ;

export interface HttpStringMap<T = string | string[]> {
  [key: string]: T;
}

export const HTTP_OPTIONS_KEYS = [
  'headers',
  'observe',
  'params',
  'reportProgress',
  'responseType',
  'withCredentials',
];

export const HTTP_OPTION_PREFIX = '~';

export interface HttpOptions {
  headers?: HttpHeaders | HttpStringMap;
  params?: HttpParams | HttpStringMap;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface HttpConfigureOptions extends HttpOptions {
  observe?: HttpObserve;
  responseType?: HttpResponseType;
  [key: string]: any;
}

export interface HttpReconfiguredOptions {
  config: HttpStringMap;
  request: HttpRequest<any>;
}
