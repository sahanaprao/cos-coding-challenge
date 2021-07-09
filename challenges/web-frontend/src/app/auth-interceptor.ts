import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const curentUser = localStorage.getItem('currentUser');
        if (curentUser) {
            req = req.clone({
                setHeaders: {
                    Authorization: `${curentUser}`
                }
            });
        }
    return next.handle(req);
  }
}