import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuctionsModule } from './auctions/auctions.module';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'auctions',
    loadChildren: () => import('./auctions/auctions.module').then(m => m.AuctionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
