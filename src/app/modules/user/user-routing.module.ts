import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { userGuard } from '../../core/guards/user.guard';
import { UserTableComponent } from './components/user-table/user-table.component';

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
    component:UserDashboardComponent,
    canActivateChild: [userGuard],
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'employeeLead', component:UserTableComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
