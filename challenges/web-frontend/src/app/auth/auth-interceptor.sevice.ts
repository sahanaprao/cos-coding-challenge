import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuctionsService } from '../auctions/auctions.service';
import { AuthHttpInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


describe(`Auth Http Interceptor`, () => {
  let auctionService: AuctionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        auctionService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
      ],
    });

    auctionService = TestBed.get(auctionService);
    httpMock = TestBed.get(HttpTestingController);
  });
});
