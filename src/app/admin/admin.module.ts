import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UserdashComponent } from './userdash/userdash.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLeadComponent } from './user-lead/user-lead.component';
import { CookiesComponent } from './cookies/cookies.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { adminGuard } from '../core/guards/admin.guard';
import { PartnerleadComponent } from './partnerlead/partnerlead.component';
import { AttdendanceComponent } from './attdendance/attdendance.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { AdminConveyanceComponent } from './admin-conveyance/admin-conveyance.component';
import { AdminIncentiveComponent } from './admin-incentive/admin-incentive.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [adminGuard],  // only one guard

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cookies', component: CookiesComponent },
      { path: 'userlogin', component: UserLoginComponent },
      { path: 'userlead', component: UserLeadComponent },
      { path: 'usermgmt', component: UserManagementComponent },
      { path: 'partner', component: PartnerleadComponent },
      { path: 'attdendance', component: AttendanceDetailsComponent},
      { path: 'adminConveyance', component: AdminConveyanceComponent},
      { path: 'adminIncentive', component: AdminIncentiveComponent},

      // Role specific modules inside admin
      { 
        path: 'employee',
        loadChildren: () =>
          import('../modules/employee/employee.module').then(m => m.EmployeeModule)
      },

      { 
        path: 'partner',
        loadChildren: () =>
          import('../modules/partner/partner.module').then(m => m.PartnerModule)
      },

      { 
        path: 'user',
        loadChildren: () =>
          import('../modules/user/user.module').then(m => m.UserModule)
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
