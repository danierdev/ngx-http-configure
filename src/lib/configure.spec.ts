import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpConfigureOptions } from './types';
import { configure } from './configure';
import { reconfigure } from './reconfigure';

const baseUrl = 'https://jsonplaceholder.typicode.com';

interface User {
  id: number;
  name: string;
}

const fixtureUsers: User[] = [
  { id: 1, name: 'Test User 1' },
  { id: 2, name: 'Test User 2' },
];

function getUsers(httpClient: HttpClient, userConfig: HttpConfigureOptions) {
  return httpClient.get<User[]>(`${baseUrl}/users`, configure(userConfig));
}

describe('Angular Http Configure helpers', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should configure http request without options', () => {
    const userConfig: HttpConfigureOptions = {};
    getUsers(httpClient, userConfig).subscribe(users => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users`);
    const { config, request } = reconfigure(req.request);

    expect(request.method).toEqual('GET');
    expect(config).toEqual(userConfig);

    req.flush(fixtureUsers);
  });

  it('should configure http request with extra params', () => {
    const userConfig: HttpConfigureOptions = {
      foo: 'bar',
    };
    getUsers(httpClient, userConfig).subscribe(users => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users?~foo=bar`);
    const { config, request } = reconfigure(req.request, ['foo']);

    expect(request.method).toEqual('GET');
    expect(config).toEqual(userConfig);

    req.flush(fixtureUsers);
  });

  it('should configure http request with plain object headers', () => {
    const userConfig: HttpConfigureOptions = {
      foo: 'bar',
      headers: {
        baz: 'qux',
      }
    };
    getUsers(httpClient, userConfig).subscribe(users => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users?~foo=bar`);
    const { config, request } = reconfigure(req.request, ['foo']);

    expect(request.method).toEqual('GET');
    expect(request.headers.get('baz')).toEqual('qux');
    expect(config).toEqual({ foo: 'bar' });

    req.flush(fixtureUsers);
  });

  it('should configure http request with plain object params', () => {
    const userConfig: HttpConfigureOptions = {
      foo: 'bar',
      params: {
        baz: 'qux',
      }
    };
    getUsers(httpClient, userConfig).subscribe(users => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users?baz=qux&~foo=bar`);
    const { config, request } = reconfigure(req.request, ['foo']);

    expect(request.method).toEqual('GET');
    expect(request.params.get('baz')).toEqual('qux');
    expect(config).toEqual({ foo: 'bar' });

    req.flush(fixtureUsers);
  });

  it('should configure http request with http object params', () => {
    const params = new HttpParams().set('baz', 'qux');
    const userConfig: HttpConfigureOptions = {
      foo: 'bar',
      params,
    };
    getUsers(httpClient, userConfig).subscribe(users => {
      expect(users).toEqual(users);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users?baz=qux&~foo=bar`);
    const { config, request } = reconfigure(req.request, ['foo']);

    expect(request.method).toEqual('GET');
    expect(request.params.get('baz')).toEqual('qux');
    expect(config).toEqual({ foo: 'bar' });

    req.flush(fixtureUsers);
  });
});
