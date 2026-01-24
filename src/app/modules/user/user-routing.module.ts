import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { userGuard } from '../../core/guards/user.guard';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserdashComponent } from '../../admin/userdash/userdash.component';

// const routes: Routes = [
//   // {
//   //   path:'', component:UserDashboardComponent
//   // }

//   {
//       path: '',
//       children: [
//         { path: 'dashboard', component:  UserDashboardComponent}
//       ]
//     }

// ];

const routes: Routes = [
  {
    path: '',
    canActivate: [userGuard],

    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'userdash', component:UserdashComponent}
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


