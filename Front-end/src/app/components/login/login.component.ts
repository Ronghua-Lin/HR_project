import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from 'src/app/interface/authentication';

import { Store } from '@ngrx/store';
import { authenticationAction } from 'src/app/store/authentication.action';
import { Router } from '@angular/router';
import {HttpClientService} from '../../services/http-client.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientService,
    private router: Router,
    private store: Store,
  ) {}

  form: FormGroup = this.fb.group({
    username: '',
    password: '',
  });
  
  onLogin(): void {
    const userinfo: Login = this.form.getRawValue();

    // const loginUrl: string = '/api/login';
    this.httpClient.userLogin(userinfo)
    .subscribe(
          (res: any) => {
            // Retrieve data and map it to user slice of state
            console.log('employee login here',res)
            if(res.status===500||res.status===400){
              return window.alert('wrong credential!!')
            }
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            this.store.dispatch(authenticationAction.userLogin({...userinfo,email:res.email}));
            this.router.navigate([
              '/onboarding',
              { onboarding_status: res.onboarding_status },
            ]);
          }
        );

  }
  
}
