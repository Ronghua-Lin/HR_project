import { Component } from '@angular/core';

import { People } from 'src/app/interface/people';
// import { catchError, Observable, of } from 'rxjs';
// // import { Store } from '@ngrx/store';
// import { selectHR } from 'src/app/store/HR.selector';
// import { HRAction } from 'src/app/store/HR.action';
import { HttpClientService } from '../../services/http-client.service';
@Component({
  selector: 'app-employee-profile-list',
  templateUrl: './employee-profile-list.component.html',
  styleUrls: ['./employee-profile-list.component.css'],
})
export class EmployeeProfileListComponent {
  constructor(private http: HttpClientService) // ,private store:Store
  {}

  // data: Observable<any>=this.store.select(selectHR)

  // employee_profiles$:People[]|undefined
  employee_profiles: People[] | undefined 
  filtered_profiles: People[] | undefined
  search_info: String = '';
  //any type to get the whole input box, Event type to get the value
  onSearch(value: Event) {
    // console.log(this.search_info)

    
    const name = String(value).toLowerCase();

    this.filtered_profiles = this.employee_profiles?.filter((profile) =>
      profile.first_name.toLocaleLowerCase().includes(name)
    );
  }

  ngOnInit() {
    // this.data.subscribe(profiles=>{
    // this.employee_profiles$=profiles.employee_profiles});

    this.http.getEmployeesList().subscribe((users: any) => {
      console.log('users', users);
      // const employee_profiles:People[]=users.data.map((user:any)=>{
      //   return {
      //   first_name:user.first_name,
      //   middle_name:user.middle_name,
      //   last_name:user.last_name,
      //   SSN:user.SSN,
      //   work_authorization_title:user.work_authorization_title,
      //   phone_number:user.phone_number,
      //   email:user.email,
      //   profile_picture:user.profile_picture
      //   }

      // })
      this.employee_profiles = users.data;
      this.filtered_profiles = users.data;
  
      // this.store.dispatch(HRAction.getEmployees({employee_profiles}))
    });
  }
}
