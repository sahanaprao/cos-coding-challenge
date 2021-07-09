import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { Login } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
      emailFormControl: ['', Validators.required, Validators.email],
      passwordFormControl: ['',Validators.required]
    });

  constructor(
    private fb: FormBuilder,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
  }

  submit():void {
    console.log( this.loginForm);
    const crendential = {
      emailId : this.loginForm.value.emailFormControl,
      password :  this.loginForm.value.passwordFormControl 
    }

    this.loginService.login(crendential).subscribe((data: Login) => {

    }, (error) => {
    });

}

}
