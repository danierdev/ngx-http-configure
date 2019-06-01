import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

type HttpObserve = 'body' | 'events' | 'response' ;

type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text' ;

export interface HttpStringMap {
  [key: string]: string | string[];
}

export const HTTP_OPTIONS_KEYS = [
  'body',
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
