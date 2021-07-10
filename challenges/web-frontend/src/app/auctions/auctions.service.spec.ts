import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuctionsService } from './auctions.service';

describe('AuctionsService', () => {
let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let auctionsService: AuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [ HttpClientTestingModule ],
      providers: [ AuctionsService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    auctionsService = TestBed.inject(AuctionsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getAuctions', () => {
    let expectedAuctions: any;

    beforeEach(() => {
      auctionsService = TestBed.inject(AuctionsService);
      expectedAuctions = {
        total : 0,
        items : [],
        pageSize: 1
    };
    });

    it('should return expected auctions (called once)', () => {
      auctionsService.getAuctions().subscribe(
        auctions => expect(auctions).toEqual(expectedAuctions, 'should return expected auctions'),
        fail
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v2/auction/buyer/`);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock auctions
      req.flush(expectedAuctions);
    });

    it('should be OK returning no auctions', () => {
      auctionsService.getAuctions().subscribe(
        auctions => expect(auctions.length).toEqual(0, 'should have empty auctions array'),
        fail
      );

      const req = httpTestingController.expectOne(`${environment.baseUrl}v2/auction/buyer/`);
      req.flush([]); 
    });

    it('should return expected auctionses (called multiple times)', () => {
      auctionsService.getAuctions().subscribe();
      auctionsService.getAuctions().subscribe();
      auctionsService.getAuctions().subscribe(
        auctions => expect(auctions).toEqual(expectedAuctions, 'should return expected auctions'),
        fail
      );

      const requests = httpTestingController.match(`${environment.baseUrl}v2/auction/buyer/`);
      expect(requests.length).toEqual(3, 'calls to getAuctions()');

      requests[0].flush([]);
      requests[1].flush([{
        total : 0,
        items : [],
        pageSize: 1
    }]);
      requests[2].flush(expectedAuctions);
    });
  });
});
