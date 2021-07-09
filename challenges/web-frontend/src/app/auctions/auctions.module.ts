import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsDetailsComponent } from './auctions-details/auctions-details.component';


@NgModule({
  declarations: [
    AuctionsDetailsComponent
  ],
  imports: [
    CommonModule,
    AuctionsRoutingModule
  ]
})
export class AuctionsModule { }
