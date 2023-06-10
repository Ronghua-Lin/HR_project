import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import {authenticationReducer} from './store/authentication.reducer'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { EmployeeProfilesComponent } from './pages/employee-profiles/employee-profiles.component';
import { HRNavigationBarComponent } from './components/hr-navigation-bar/hr-navigation-bar.component';
import { EmployeeProfileListComponent } from './components/employee-profile-list/employee-profile-list.component';
import { HRReducer } from './store/HR.reducer';
import { InterceptorService } from './services/interceptor.service';
import { HiringManagementComponent } from './pages/hiring-management/hiring-management.component';
import { VisaStatusManagementComponent } from './pages/visa-status-management/visa-status-management.component';
import { OnboardingFormComponent } from './components/onboarding-form/onboarding-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    OnboardingComponent,
    EmployeeProfilesComponent,
    HRNavigationBarComponent,
    EmployeeProfileListComponent,
    HiringManagementComponent,
    VisaStatusManagementComponent,
    OnboardingFormComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      authentication:authenticationReducer,
      HR:HRReducer
    })
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
