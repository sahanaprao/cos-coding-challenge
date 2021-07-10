import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsDetailsComponent } from './auctions-details/auctions-details.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AuctionsDetailsComponent
  ],
  imports: [
    CommonModule,
    AuctionsRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class AuctionsModule { }
