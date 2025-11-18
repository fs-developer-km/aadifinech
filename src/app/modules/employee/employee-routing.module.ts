import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { employeeGuard } from '../../core/guards/employee.guard';
import { EmployeeAssignLeadComponent } from './components/employee-assign-lead/employee-assign-lead.component';
import { EmployeenewleadComponent } from './components/employeenewlead/employeenewlead.component';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [employeeGuard],
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'employeeassignlead', component: EmployeeAssignLeadComponent },
      { path: 'newleademployee', component: EmployeenewleadComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
