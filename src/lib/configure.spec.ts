import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configure, reconfigure } from './configure';

const baseUrl = 'https://jsonplaceholder.typicode.com';

interface User {
  id: number;
  name: string;
}

describe('Angular Http Configure helpers', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('configure standard http request', () => {
    const testData: User[] = [
      { id: 1, name: 'Test User 1' },
      { id: 2, name: 'Test User 2' },
    ];
    const extraConfig = {
      foo: 'bar',
    };
    const users$: Observable<User[]> = httpClient.get<User[]>(`${baseUrl}/users`, configure(extraConfig));
    users$.subscribe((data: any) => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(`${baseUrl}/users?~foo=bar`);
    const { config, request } = reconfigure(req.request);

    expect(request.method).toEqual('GET');
    expect(config).toEqual(extraConfig);

    req.flush(testData);
  });
});
