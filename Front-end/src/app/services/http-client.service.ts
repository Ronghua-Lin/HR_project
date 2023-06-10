import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login,Signup} from '../interface/authentication'
import {catchError, of} from 'rxjs'
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http:HttpClient) { }


  loginUrl:string='/api/login';
  requestTokenUrl:string='/api/HR/send_registration_token'
  signUpUrl:string='/api/signup'
  getBasicUserInfoUrl:string='/api/get_basic_user_info';
  onboardingSubmitUrl:string='/api/onboarding_application_submit';
  getEmployeesUrl: string = '/api/HR/employee_profiles';
  visaStatus: string = '/api/HR/employees_visa_status';
  emailNoticefication: string = '/api/HR/send_email_noticefication';
  FileDecision:string='/api/HR/visaproval';
  onboardingApplications:string='/api/HR/onboarding_application';
  onboardingApplicationsIndivisual:string='/api/HR/onboarding_application_indivisual';
  onboardingApplicationsAction:string='/api/HR/onboarding_application_action';
  
  
  //Authentication
  userLogin(user:Login):Observable<Login|{err:any}[]>{
    return this.http.post<Login>(this.loginUrl, user)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )

  }

  getSignUp(jwt:String|null):Observable<any>{
    const url=this.signUpUrl+'?jwt='+jwt
    return this.http.get(url)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  postSignUp(newUser:Signup):Observable<any>{

    return this.http.post(this.signUpUrl,newUser)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  sendRegistrationToken(email:String):Observable<any>{

    return this.http.post(this.requestTokenUrl, {email})
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  
  }

  getBasicUserInfo():Observable<any>{
    return this.http.get(this.getBasicUserInfoUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  onboardingSubmit(data:any):Observable<any>{
  
    return this.http.post(this.onboardingSubmitUrl,data)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  //HR
  getEmployeesList():Observable<any>{
    return this.http.get(this.getEmployeesUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  getVisaStatus():Observable<any>{
    return this.http.get(this.visaStatus)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  sendEmailNoticefication(id:String):Observable<any>{
    console.log('id is ',id)
    return this.http.post(this.emailNoticefication,{id})
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  visaproval(info:any):Observable<any>{
   
    return this.http.post(this.FileDecision,{...info})
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  getOnboardingApplications():Observable<any>{

    return this.http.get(this.onboardingApplications)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  getOnboardingApplicationIndivisual(id:string):Observable<any>{

    return this.http.get(`${this.onboardingApplicationsIndivisual}?id=${id}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }

  postonboardingApplicationsAction(id:string,action:string):Observable<any>{

    return this.http.post(this.onboardingApplicationsAction,{id,action})
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong');
      })
    )
  }
  
  
  //Employee
}
