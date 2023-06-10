import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/jwt-auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {OnboardingComponent} from './pages/onboarding/onboarding.component'
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HRAuthGuardService } from './services/hr-auth-guard.service';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { VisaStatusManagementComponent } from './pages/visa-status-management/visa-status-management.component';
import { OnboardingFormComponent } from './components/onboarding-form/onboarding-form.component';
const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'onboarding',component:OnboardingComponent, canActivate: [AuthGuardService]},
  {path:'HR/home',component:EmployeeProfilesComponent, canActivate: [AuthGuardService,HRAuthGuardService]},
  {path:'HR/employee_profiles',component:EmployeeProfilesComponent, canActivate: [AuthGuardService,HRAuthGuardService]},
  {path:'HR/visa_status_management',component:VisaStatusManagementComponent, canActivate: [AuthGuardService,HRAuthGuardService]},
  {path:'HR/hiring_management',component:HiringManagementComponent, canActivate: [AuthGuardService,HRAuthGuardService]},
  {path:'HR/housing_management',component:EmployeeProfilesComponent, canActivate: [AuthGuardService,HRAuthGuardService]},
  {path:'HR/onboarding_application_indivisuals',component:OnboardingFormComponent},
  {path:'pageNotFound',component:NotFoundComponent},
  
  {path:'**',component:NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
