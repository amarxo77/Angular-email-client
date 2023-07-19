import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { SignoutComponent } from './signout/signout.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    FormErrorsComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
