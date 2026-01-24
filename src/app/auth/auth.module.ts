import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {authRedirectGuard} from "../core/guards/auth-redirect.guard"


// apne components import karo
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';


// routes define karo
const routes: Routes = [
  // { 
  //   path: 'login',
  //    component: LoginComponent ,
  //     canActivate: [authRedirectGuard]
  // },
  // { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent,   // ✅ standalone components added in imports
    SignupComponent,  // ✅ standalone components added in imports
    RouterModule.forChild(routes) // yahi auth ke routes connect karega

    
  ]
})
export class AuthModule { }
