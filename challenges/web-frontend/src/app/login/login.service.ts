import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private https: HttpClient) { }

  login(crendential:User ): Observable<any> {

    const { emailId , password } = crendential;
    
    const url = `${environment.baseUrl}/authentication/${emailId}`;

    const options = {
      password: password,
      meta: ''
    }

    return this.https.put(url, options, this.httpOptions).pipe(
      tap(_ => this.log(`authentiacte user mailId=${emailId}`)),
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

  private log(message: string) {
    console.log(`LoginService: ${message}`);
  }
}
