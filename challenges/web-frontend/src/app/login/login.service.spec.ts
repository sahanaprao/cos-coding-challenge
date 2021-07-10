import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { LoginService } from './login.service';
import { User, Auth } from './user';

describe('LoginService (with mocks)', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule ],
      providers: [ LoginService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  /// LoginService method tests begin ///

  describe('#login', () => {
    
    const makeUrl = `${environment.baseUrl}v1/authentication/salesman@random.com`;

    it('should login and return authentication', () => {

      const credential: User = { emailId: 'salesman@random.com', password: '123test'};
      const requestBody = {password: '123test', meta: ''}
      const authentication: Auth = {
          authenticated: true,
          internalUserId: 0,
          internalUserUUID: '',
          privileges: '',
          token: '',
          type: 0,
          userId: ''
        };

      loginService.login(credential).subscribe(
        data => expect(data).toEqual(authentication, 'should return the auth'),
        fail
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v1/authentication/salesman@random.com`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(requestBody);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: authentication });
      req.event(expectedResponse);
    });

    it('should turn 404 error into user-facing error', () => {
      const msg = '404';
      const credential: User = { emailId: 'salesman@random.com', password: '123test'};
      loginService.login(credential).subscribe(
        data => fail('expected to fail'),
        error => expect(error).toContain(msg)
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v1/authentication/salesman@random.com`);

      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should turn network error into user-facing error', () => {
      const emsg = 'simulated network error';
      
      const credential: User = { emailId: 'salesman@random.com', password: '123test'};
      
      loginService.login(credential).subscribe(
        data => fail('expected to fail'),
        error => expect(error.message).toContain(emsg)
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v1/authentication/salesman@random.com`);

      const errorEvent = new ErrorEvent('so sad', {
        message: emsg,
        filename: 'login.service.ts',
        lineno: 31,
        colno: 21
      });

      req.error(errorEvent);
    });
  });

  it('should turn 401 error', () => {
        const msg = {
          msgKey: 'user.not-authenticated', 
          params: {userId: 'sahana@gmeil.com'}, 
          message: 'Authentisierung für Benutzer "sahana@gmeil.com" fehlgeschlagen.'
          }
      const credential: User = { emailId: 'sahana@gmeil.com', password: '123test'};
  
      loginService.login(credential).subscribe(
        data => fail('expected to fail'),
        error => expect(error.msgKey).toContain(msg.msgKey)
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v1/authentication/sahana@gmeil.com`);

      req.flush(msg, {status: 401, statusText: 'Unauthorized'});
    });

});