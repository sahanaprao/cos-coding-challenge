import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit():void {
  }

}
