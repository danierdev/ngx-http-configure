<div align="center">
  <img width="64" src="https://angular.io/assets/images/logos/angular/angular.svg">
  <br />
  HTTP interceptors / services configure in Angular
  <br /><br />

  [![Build Status](https://travis-ci.org/drivas/ngx-http-configure.svg?branch=master)](https://travis-ci.org/drivas/ngx-http-configure)
  [![version](https://img.shields.io/npm/v/ngx-http-configure.svg)](https://www.npmjs.com/package/ngx-http-configure)
  [![Downloads](http://img.shields.io/npm/dm/ngx-http-configure.svg)](https://npmjs.org/package/ngx-http-configure)
  [![license](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ngx-http-configure)
</div>

---

# ngx-http-configure

Ngx HTTP configure is a library for Angular that helps you reconfigure your interceptors in a clear and concise way by extending the HttpClient API


## Installation

To install this library, run:

```bash
$ npm install ngx-http-configure
```

## Using the library

Import the `configure()` helper in your injectable service:

The configure function takes the same parameters as the options http request object.

```typescript

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import the configure helper from lib
import { configure } from 'ngx-http-configure';

@Injectable()
export class UserService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com';
  
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get(`/users`, configure({
      baseUrl: this.baseUrl,
    }));
  }
}
```

Once your service method is configured, you can use its options in your interceptor:

```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { reconfigure } from 'ngx-http-configure';

/**
 * Prefixes all requests not starting with `http[s]` with configure `baseUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      let { config, request } = reconfigure(request);
      request = request.clone({ url: `${config.baseUrl}${request.url}` });
    }
    return next.handle(request);
  }
}
```

## License

MIT © [Danier Rivas](mailto:d_rivas@outlook.com)
