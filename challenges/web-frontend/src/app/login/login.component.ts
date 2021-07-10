import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from './login.service';
import { Auth } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  loginSubscription!:Subscription;
  timeout:number = 0;
  loginForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      passwordFormControl: ['',Validators.required]
    });

  constructor(
    private fb: FormBuilder,
    private loginService:LoginService,
    private router: Router
    ) { }

  ngOnInit():void {
    if(localStorage.getItem('token') && localStorage.getItem('userId') ) {
        this.navigateToAuction();
    }
  }

  submit():void {
    const crendential = {
      emailId : this.loginForm.value.emailFormControl,
      password :  this.loginForm.value.passwordFormControl 
    }

    this.loginSubscription = this.loginService.login(crendential).subscribe((data: Auth) => {
        localStorage.setItem('token',data.token);
        localStorage.setItem('userId',data.userId);
        this.navigateToAuction();
    }, (error) => {
      this.errorMessage = error.msgKey;
      this.timeout = setTimeout(() => {
        this.errorMessage = '';
      }, 10000);

    });

  }

  navigateToAuction(): void {
    this.router.navigate(['/auctions']);
  }

  ngOnDestroy() {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
    clearTimeout(this.timeout);
  }

}
