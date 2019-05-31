# Angular Http Configure

A cool Angular library for configure http interceptors!

## Installation

```bash
$ npm install ng-http-configure
```

and then from your Angular service:

```typescript

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import the configure helper from lib
import { configure } from 'ng-http-configure';

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

import { reconfigure } from 'ng-http-configure';

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

