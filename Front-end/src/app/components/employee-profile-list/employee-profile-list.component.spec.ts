import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileListComponent } from './employee-profile-list.component';

describe('EmployeeProfileListComponent', () => {
  let component: EmployeeProfileListComponent;
  let fixture: ComponentFixture<EmployeeProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfileListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
