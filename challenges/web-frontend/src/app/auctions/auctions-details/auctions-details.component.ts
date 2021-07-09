import { Component, OnInit } from '@angular/core';

import { AuctionsService } from '../auctions.service';

@Component({
  selector: 'app-auctions-details',
  templateUrl: './auctions-details.component.html',
  styleUrls: ['./auctions-details.component.scss']
})
export class AuctionsDetailsComponent implements OnInit {

  constructor(private auctionsService: AuctionsService) { }

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions():void {
    this.auctionsService.getAuctions().subscribe(data => {
      
    },(error) => {
    
    });
  }

}
