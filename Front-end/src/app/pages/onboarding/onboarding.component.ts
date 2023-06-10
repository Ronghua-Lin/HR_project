import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthentication } from 'src/app/store/authentication.selector';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import {HttpClientService} from '../../services/http-client.service'

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private httpClient: HttpClientService
  ) {}

  // users$: Observable<any> = this.store.select(selectAuthentication);

  onboarding_status: string |null = '';
  // email:string=''

  form: FormGroup = this.fb.group({
    first_name: ['',Validators.required],
    middle_name:'',
    last_name: ['',Validators.required],
    profile_picture: '',
    profile_picture_source: '',
    current_address:['',Validators.required],
    phone_number:undefined,
    car_information:this.fb.group({
      make:'',
      model:'',
      color:''
    }),
    email:'',
    SSN:'',
    birthday:'',
    gender:'',
    permanent_resident:true,
    citizenship:'',
    work_authorization:this.fb.group({
      title:'',
      start_date:'',
      end_date:'',
      others_visa:'',
      work_authorization_document:'',
      work_authorization_source:''
    }),
    
    driver_license:false,
    driver_license_information:this.fb.group({
      number:'',
      expiration_date:'',
      license_copy:'',
      license_copy_source: '',
    }),
    reference:false,
    reference_information:this.fb.group({
      first_name:'',
      middle_name:'',
      last_name:'',
      phone_number:undefined,
      email:'',
      relationship:''
    }),
    emergency_contact:this.fb.group({
      first_name:'',
      middle_name:'',
      last_name:'',
      phone_number:undefined,
      email:'',
      relationship:''
    }),
  });

  ngOnInit() {
    this.onboarding_status =
      this.route.snapshot.paramMap.get('onboarding_status');

    if (this.onboarding_status === 'approved') {
      const role = localStorage.getItem('role');
      if (role === 'HR') {
        this.router.navigate(['/HR/employee_profiles']);
      } else if (role === 'employee') {
      }
    }

    this.httpClient.getBasicUserInfo().subscribe(
      (res: any) => {
     
        if (res.status===400) {
          window.alert('wrong credential sing up!');
          this.router.navigate(['/pageNotFound']);
        }
        this.form.controls['email'].setValue(res.email);
        this.form.controls['email'].disable();
        this.onboarding_status=res.onboarding_status
      },

    );

  }

  onFileChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    
      let source='none';

      if(event.target.name==='profile_picture'){
        source='profile_picture_source';
        this.form.patchValue({
          [source]: file
        });
      }
      else if(event.target.name==='license_copy'){
        source='license_copy_source',
        this.form.get('driver_license_information')?.patchValue({
          [source]: file
        });
      }
      else if(event.target.name==='work_authorization_document'){
        source='work_authorization_source'
        this.form.get('work_authorization')?.patchValue({
          [source]: file
        });
      }

      
      
    }
  }

  onFormSubmit(){
    const application_info = this.form.getRawValue();

    const formData = new FormData();

    formData.append('form_data', JSON.stringify(application_info));

    
    if(this.form.get('profile_picture_source')?.value){
      formData.append('profile_picture_source', this.form.get('profile_picture_source')?.value);
    }
    if(this.form.get('driver_license_information')?.get('license_copy_source')?.value){
      formData.append('license_copy_source', this.form.get('driver_license_information')?.get('license_copy_source')?.value);
    }
    if(this.form.get('work_authorization')?.get('work_authorization_source')?.value ){
      formData.append('OPT_receipt', this.form.get('work_authorization')?.get('work_authorization_source')?.value);
    }


    
    this.httpClient.onboardingSubmit(formData).subscribe(
      (res: any) => {
   
        if (res.status===400) {
          window.alert('wrong credential sing up!');
          this.router.navigate(['/pageNotFound']);
        }
        
        this.onboarding_status='pending';
      },

    );

    
    // console.log('this is formdata',formData.get('file'))
    // this.form.reset();
  }
}
