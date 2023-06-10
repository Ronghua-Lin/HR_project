import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientService } from '../../services/http-client.service';
import { Router,NavigationExtras  } from '@angular/router';
interface CustomNavigationExtras extends NavigationExtras {
  target?: string;

}


@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css'],
})
export class HiringManagementComponent {
  constructor(private fb: FormBuilder, 
    private http: HttpClientService,
    private router:Router) {}

  email: String = '';
  onboarding_applicaitons: any={
    pending:[],
    approved:[],
    rejected:[]
  }
  provide_feedback:boolean=false;

  ngOnInit() {
    this.http
      .getOnboardingApplications()
      .subscribe((employees: any) => {
        console.log('users here', employees.data);
        this.onboarding_applicaitons.pending=employees.data.filter((employee:any)=>employee.onboarding==="pending")
        this.onboarding_applicaitons.approved=employees.data.filter((employee:any)=>employee.onboarding==="approved")
        this.onboarding_applicaitons.rejected=employees.data.filter((employee:any)=>employee.onboarding==="rejected")

      
      });
  }

  onSendToken() {
    this.http.sendRegistrationToken(this.email)
    .subscribe(
      (res: any) => {
        console.log('send token successfully ', res);
        window.alert('token sent successfully!')
        
      }
    );
  }
  viewApplication(id:string){
    console.log('id trigeer',id)
  //   const navigationExtras: CustomNavigationExtras = { target: '_blank',queryParams: {id} };
  //   this.router.navigate(['/HR/onboarding_application_indivisual'],  navigationExtras);
    const url = this.router.createUrlTree(['/HR/onboarding_application_indivisuals'], { queryParams: { id } }).toString();
    window.open(url, '_blank');
  }

  onApprove(id:string){
    this.http.postonboardingApplicationsAction(id,"approve")
    .subscribe(
      (res: any) => {
        console.log('approval successfully ', res);

        
      }
    );
  }

  onReject(id:string){
    
    this.http.postonboardingApplicationsAction(id,"reject")
    .subscribe(
      (res: any) => {
        console.log('reject successfully ', res);

        
      }
    );
  }
  
}
