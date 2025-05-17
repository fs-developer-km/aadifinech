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


export const routes: Routes = [
    {
        path: '', component:HomeComponent
    },
    {
        path: 'about', component:AboutComponent
    },
    {
        path: 'appointment', component:AppointmentComponent
    },
    {
        path: 'founderprofile', component:PricingPlanComponent
    },
    {
        path: 'team', component:TeamComponent
    },
    {
        path: 'insurence', component:InsurencePageComponent
    },
    {
        path: 'insurenceDetails', component:InsurenceDetailsComponent
    },
    {
        path: 'partner', component:BlogPageComponent
    },
    {
        path: 'blogDetails', component:BlogDetailsComponent
    },
    {
        path: 'contact', component:ContactUsComponent
    },
    { path: 'services/fund-raising', component: FundRaisingComponent },
    { path: 'services/investment-banking', component: InvestmentBankingComponent },
    { path: 'services/training-placement', component: TrainingPlacementComponent },
    { path: 'services/credit-rating', component: CreditRatingComponent },
    { path: 'services/tech-services', component: TechServicesComponent },
    { path: 'services/digital-marketing', component: DigitalMarketingComponent },

];
