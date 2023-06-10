import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
import { Signup } from 'src/app/interface/authentication';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientService
  ) {}

  form: FormGroup = this.fb.group({
    username: '',
    password: '',
    email: '',
  });

  ngOnInit() {
    const jwt = this.route.snapshot.queryParamMap.get('jwt');

    this.httpClient.getSignUp(jwt).subscribe(
      (res: any) => {
        console.log('sign up successfully ', res);
        if (res.status===401) {
          window.alert('wrong credential sing up!');
          this.router.navigate(['/pageNotFound']);
        }
        this.form.controls['email'].setValue(res.email);
      },

    );
  }
  onSignup(): void {
    const userinfo: Signup = this.form.getRawValue();
    console.log('clicked',userinfo)
    this.httpClient.postSignUp(userinfo).subscribe(
      (res: any) => {
        console.log('sign up successfully ', res);
        if(res.msg==='success'){
          window.alert('sign up successfully')
          this.router.navigate(['/login']);
        }else if (res.status===500) {
          window.alert(res.error.msg);
        }
      }
    )
  }
}
