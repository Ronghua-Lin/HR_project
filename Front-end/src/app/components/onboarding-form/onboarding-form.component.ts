import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../../services/http-client.service';
@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent {
  constructor(private route: ActivatedRoute,private http: HttpClientService,) { }
  employee:any={}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(`id: ${id}, `);
      
      this.http
      .getOnboardingApplicationIndivisual(id)
      .subscribe((data: any) => {
        console.log('indivisuals here', data);
        this.employee=data.data
        console.log('indivisuals 22222', this.employee.car_information.make);
      });
    });
  }
}
