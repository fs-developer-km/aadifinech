import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './components/page/about/about.component';
import { AppointmentComponent } from './components/page/appointment/appointment.component';
import { PricingPlanComponent } from './components/page/pricing-plan/pricing-plan.component';
import { TeamComponent } from './components/page/team/team.component';
import { InsurencePageComponent } from './components/insurence/insurence-page/insurence-page.component';
import { InsurenceDetailsComponent } from './components/insurence/insurence-details/insurence-details.component';
import { BlogPageComponent } from './components/news/blog-page/blog-page.component';
import { BlogDetailsComponent } from './components/news/blog-details/blog-details.component';
import { ContactUsComponent } from './components/contact/contact-us/contact-us.component';
import { FundRaisingComponent } from './services/fund-raising/fund-raising.component';
import { InvestmentBankingComponent } from './services/investment-banking/investment-banking.component';
import { TrainingPlacementComponent } from './services/training-placement/training-placement.component';
import { CreditRatingComponent } from './services/credit-rating/credit-rating.component';
import { TechServicesComponent } from './services/tech-services/tech-services.component';
import { DigitalMarketingComponent } from './services/digital-marketing/digital-marketing.component';
import { LoanForEveryIndianComponent } from './services/loan-for-every-indian/loan-for-every-indian.component';
import { RealStateComponent } from './services/real-state/real-state.component';
import { WealthMaanagementComponent } from './services/wealth-maanagement/wealth-maanagement.component';
import { BillDiscountsComponent } from './services/bill-discounts/bill-discounts.component';
import { ExportBillDiscountingComponent } from './services/export-bill-discounting/export-bill-discounting.component';
import { CresitRatingComponent } from './services/cresit-rating/cresit-rating.component';
import { OurInsuranceServicesComponent } from './services/our-insurance-services/our-insurance-services.component';
import { OurEndToEndforeignServicesComponent } from './services/our-end-to-endforeign-services/our-end-to-endforeign-services.component';
import { BankingDomainExpertConsultancyComponent } from './services/banking-domain-expert-consultancy/banking-domain-expert-consultancy.component';
import { FinancialConsultancyforCorporatesComponent } from './services/financial-consultancyfor-corporates/financial-consultancyfor-corporates.component';
import { OurMissionComponent } from './services/our-mission/our-mission.component';
import {authRedirectGuard} from "./core/guards/auth-redirect.guard"
import { PayNowComponent } from './components/page/pay-now/pay-now.component';



export const routes: Routes = [

  // =============================
  // 🟦 PUBLIC WEBSITE ROUTES
  // =============================
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'founderprofile', component: PricingPlanComponent },
  { path: 'team', component: TeamComponent },
  { path: 'insurence', component: InsurencePageComponent },
  { path: 'insurenceDetails', component: InsurenceDetailsComponent },
  { path: 'paynow', component:PayNowComponent},

  // PUBLIC PARTNER PAGE (Blog)
  { path: 'partner-page', component: BlogPageComponent },
  { path: 'blogDetails', component: BlogDetailsComponent },

  { path: 'contact', component: ContactUsComponent },

  // SERVICE PAGES...
  { path: 'services/fund-raising', component: FundRaisingComponent },
  { path: 'services/ourMission', component: OurMissionComponent },
  { path: 'services/investment-banking', component: InvestmentBankingComponent },
  { path: 'services/training-placement', component: TrainingPlacementComponent },
  { path: 'services/credit-rating', component: CreditRatingComponent },
  { path: 'services/tech-services', component: TechServicesComponent },
  { path: 'services/digital-marketing', component: DigitalMarketingComponent },
  { path: 'services/loanForEveryIndian', component: LoanForEveryIndianComponent },
  { path: 'services/realState', component: RealStateComponent },
  { path: 'services/wealth', component: WealthMaanagementComponent },
  { path: 'services/billDiscounting', component: BillDiscountsComponent },
  { path: 'services/exportbillDiscounting', component: ExportBillDiscountingComponent },
  { path: 'services/creditRatingAdversory', component: CresitRatingComponent },
  { path: 'services/ourInsuranceServices', component: OurInsuranceServicesComponent },
  { path: 'services/ourEndToEndforeignServices', component: OurEndToEndforeignServicesComponent },
  { path: 'services/bankingDomainExpertConsultency', component: BankingDomainExpertConsultancyComponent },
  { path: 'services/FinancialConsultancyforCorporates', component: FinancialConsultancyforCorporatesComponent },

  // =============================
  // 🟧 AUTH
  // =============================


  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [authRedirectGuard]
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then(m => m.SignupComponent)
  },


  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  // =============================
  // 🟥 ADMIN DASHBOARD
  // =============================
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // =============================
  // 🟩 EMPLOYEE DASHBOARD
  // =============================
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },

  // =============================
  // 🟪 PARTNER DASHBOARD
  // =============================
  {
    path: 'partner',
    loadChildren: () => import('./modules/partner/partner.module').then(m => m.PartnerModule)
  },

  // =============================
  // 🟦 USER DASHBOARD
  // =============================
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },

  

  // =============================
  // 🚫 Wildcard
  // =============================
  { path: '**', redirectTo: '' }

];
