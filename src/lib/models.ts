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

interface BaseHttpOptions {
  body?: any;
  headers?: HttpHeaders | HttpStringMap;
  params?: HttpParams | HttpStringMap;
  reportProgress?: boolean;
  responseType?: any | HttpResponseType;
  withCredentials?: boolean;
}

export interface HttpOptions extends BaseHttpOptions {
  observe: any | HttpObserve;
}

export interface HttpConfigureOptions extends BaseHttpOptions {
  observe?: any | HttpObserve;
  [propName: string]: any;
}

export interface HttpReconfiguredOptions {
  config: HttpStringMap;
  request: HttpRequest<any>;
}
