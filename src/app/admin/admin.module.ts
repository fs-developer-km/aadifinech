import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UserdashComponent } from './userdash/userdash.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLeadComponent } from './user-lead/user-lead.component';
import { CookiesComponent } from './cookies/cookies.component';




// ✅ Admin ke routes yahi define karte hain
const routes: Routes = [
   {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userdash', component: UserdashComponent},
      { path: 'userlogin',component: UserLoginComponent},
      { path: 'userlead', component: UserLeadComponent},
      { path: 'cookies', component: CookiesComponent}
    ],
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // yahi auth ke routes connect karega
    
  ]
})
export class AdminModule { }
