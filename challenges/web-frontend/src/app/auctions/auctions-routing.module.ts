import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuctionsDetailsComponent } from './auctions-details/auctions-details.component';

const routes: Routes = [
  { path: '', component: AuctionsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionsRoutingModule { }
