import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDashboardComponent } from './components/partner-dashboard/partner-dashboard.component';
import { partnerGuard } from '../../core/guards/partner.guard';
import { PartnerTableComponent } from './components/partner-table/partner-table.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [partnerGuard],
    children: [
      { path: 'dashboard', component: PartnerDashboardComponent },
      { path: 'partnerTable', component: PartnerTableComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
