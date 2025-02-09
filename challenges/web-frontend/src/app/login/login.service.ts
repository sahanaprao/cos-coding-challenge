import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User, Auth } from './user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private https: HttpClient) { }

  login(crendential:User ): Observable<Auth> {

    const { emailId , password } = crendential;
    
    const url = `${environment.baseUrl}v1/authentication/${emailId}`;

    const options = {
      password: password,
      meta: ''
    }
    return this.https.put<Auth>(url, options, this.httpOptions).pipe(
      catchError(this.handleError));
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      error.error);
  }

}
