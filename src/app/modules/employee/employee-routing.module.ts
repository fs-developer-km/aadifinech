import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { employeeGuard } from '../../core/guards/employee.guard';
import { EmployeeAssignLeadComponent } from './components/employee-assign-lead/employee-assign-lead.component';
import { EmployeenewleadComponent } from './components/employeenewlead/employeenewlead.component';
import { AttendanceEmployeeComponent } from './components/attendance-employee/attendance-employee.component';
import { CrmurlsComponent } from './components/crmurls/crmurls.component';
import { ConveyanceComponent } from './components/conveyance/conveyance.component';
import { EmployeeIncentiveComponent } from './components/employee-incentive/employee-incentive.component';
import { EmployeeDashboardComponentComponent } from './components/employee-dashboard-component/employee-dashboard-component.component';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [employeeGuard],
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'employeeassignlead', component: EmployeeAssignLeadComponent },
      { path: 'newleademployee', component: EmployeenewleadComponent },
      { path: 'attendanceEmployee', component: AttendanceEmployeeComponent },
      { path: 'crmurls', component: CrmurlsComponent },
      { path: 'conveyance', component: ConveyanceComponent },
      { path: 'incentive', component: EmployeeIncentiveComponent },
      { path: 'partnerlead', component: EmployeeDashboardComponentComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
