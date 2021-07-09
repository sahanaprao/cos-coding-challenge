import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          BrowserAnimationsModule,
          ReactiveFormsModule, 
          FormsModule, 
          MatCardModule,
          MatInputModule,
          MatButtonModule,
          MatFormFieldModule
        ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: LoginService, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
     component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email & password field validity', () => {
    let email = component.loginForm.controls['emailFormControl']; 
    let password = component.loginForm.controls['passwordFormControl']; 
    expect(email.valid).toBeFalsy(); 
    expect(password.valid).toBeFalsy(); 
  });

  it('Test a LoginForm', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#loginForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  });

  it('check username after entering value and validation',() => {
    const loginFormElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
    loginFormElement.value = 'abc@gmail.com';
    loginFormElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    let email = component.loginForm.controls['emailFormControl']; 
    expect(loginFormElement.value).toBe(email.value);
  });

});
