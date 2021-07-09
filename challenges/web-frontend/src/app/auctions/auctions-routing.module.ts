import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuctionsDetailsComponent } from './auctions-details/auctions-details.component';
import { AuthGuardService as AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: AuctionsDetailsComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionsRoutingModule { }
