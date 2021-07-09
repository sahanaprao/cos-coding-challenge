import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  constructor(private https: HttpClient) { }

  getAuctions(): Observable<any> {

    const url = `${environment.baseUrl}/v2/auction/buyer/`;

    return this.https.get(url).pipe(
      catchError(this.handleError)
    );
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
    console.log(`AuctionsService: ${message}`);
  }
}
