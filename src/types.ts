import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

type HttpObserve = 'body' | 'events' | 'response' ;

type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text' ;

export interface HttpStringMap<T = string | string[]> {
  [key: string]: T;
}

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
  config: Record<string, any>;
  request: HttpRequest<any>;
}
