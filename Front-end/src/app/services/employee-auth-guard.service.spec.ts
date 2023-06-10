import { TestBed } from '@angular/core/testing';

import { EmployeeAuthGuardService } from './employee-auth-guard.service';

describe('EmployeeAuthGuardService', () => {
  let service: EmployeeAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
