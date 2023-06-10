import { Component } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';
import { VisaProfiles, VisaFiles } from '../../interface/HR';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css'],
})
export class VisaStatusManagementComponent {
  constructor(
    private http: HttpClientService // ,private store:Store
  ) {}

  inProgressProfiles: VisaProfiles[] = [];
  allVisaStatus: any[] = [];
  approvedVisa: VisaFiles[] = [];

  ngOnInit() {
    this.http
      .getVisaStatus()
 
      .subscribe((users: any) => {
        console.log('users here', users.data);
      

        const complete = users.data.filter(
          (user: any) => user.work_authorization.OPT_type === 'done'
        );


        this.allVisaStatus=complete.map((data: any) => {
          var diff = Math.floor(
            (Date.parse(data.work_authorization.end_date) -
              Date.parse(data.work_authorization.start_date)) /
              86400000
          );

          return {
            id: data.id,
            name: data.first_name + ' ' + data.last_name,
            work_authorization: {
              title: data.work_authorization.title,
              start_date: data.work_authorization.start_date,
              end_date: data.work_authorization.end_date,
              days_remainding: diff,
              OPT_status:data.work_authorization.OPT_status,
            },
            action: {
              OPT_status: data.work_authorization.OPT_status,
              file: data.work_authorization_documents,
            },
          };
        });
        console.log('allVisaStatus',this.allVisaStatus)

        // F1(CPT/OPT)
        const inprogress = users.data.filter(
          (user: any) =>
            user.work_authorization.title === 'F1(CPT/OPT)' &&
            user.work_authorization.OPT_type !== 'done'
        );

        this.inProgressProfiles = inprogress.map((data: any) => {
          var diff = Math.floor(
            (Date.parse(data.work_authorization.end_date) -
              Date.parse(data.work_authorization.start_date)) /
              86400000
          );

          return {
            id: data.id,
            name: data.first_name + ' ' + data.last_name,
            work_authorization: {
              title: data.work_authorization.title,
              start_date: data.work_authorization.start_date,
              end_date: data.work_authorization.end_date,
              days_remainding: diff,
              OPT_status:data.work_authorization.OPT_status,
            },
            action: {
              OPT_status: data.work_authorization.OPT_status,
              file: data.work_authorization_documents,
            },
          };
        });
      });
  }

  sendnoticefication(id: String) {
    this.http
      .sendEmailNoticefication(id)
      .subscribe(
        (res: any) => {
          console.log('res',res)
          // window.alert('email sent!')
        }
      );
  }
  reject(id: String){
    this.http
      .visaproval({decision:"reject",id})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          //httperror except to throw an error
          console.log('Something went wrong', error.message);
          return throwError('Network error');
        })
      )
      .subscribe(
        (res: any) => {
          console.log('res',res)
          // window.alert('email sent!')
        }
      );
    
  }
  accept(id: String){
    this.http
    .visaproval({decision:"accept",id})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        //httperror except to throw an error
        console.log('Something went wrong', error.message);
        return throwError('Network error');
      })
    )
    .subscribe(
      (res: any) => {
        console.log('res',res)
        // window.alert('email sent!')
      }
    );
  }
}
