import { Component, ViewChild, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';


import { AuctionsService } from '../auctions.service';

@Component({
  selector: 'app-auctions-details',
  templateUrl: './auctions-details.component.html',
  styleUrls: ['./auctions-details.component.scss']
})
export class AuctionsDetailsComponent implements OnInit {

  auctionDetails:any = [];
  originalAuctions:any = [];
  isLoading:boolean = false;
  paginationLength: number = 0;
  auctionSubscription!:Subscription;
  intervalSubscription!:Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private auctionsService: AuctionsService) { }

  ngOnInit(): void {
    this.getAuctions();
    this.intervalSubscription = interval(20000)
    .subscribe(() => { this.getAuctions(); });
  }

  getAuctions():void {
    let remainingTime;
    this.isLoading = true;
    this.auctionDetails = [];
    this.auctionSubscription = this.auctionsService.getAuctions().subscribe(data => {
      this.paginationLength = data.total;
      this.isLoading = false;
      this.originalAuctions = [...data.items];
      
      this.originalAuctions.forEach((element:any) => {
       remainingTime = new Date(element.remainingTimeInSeconds * 1000).toISOString().substr(11, 8).split(':');
       element.remainingTimeInSeconds = `${remainingTime[0]}h:${remainingTime[1]}m:${remainingTime[2]}s`; 
      });

      this.auctionDetails.paginator = this.paginator;
      this.auctionDetails = this.originalAuctions.slice(0,5);
      
    },(error) => {
      this.isLoading = false;
    });
  }

  pageEvent(event:any) {
    this.auctionDetails = this.originalAuctions.slice( (event.pageIndex * event.pageSize ) ,((event.pageIndex+1) * event.pageSize ));
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
    this.auctionSubscription.unsubscribe();
  }

}
