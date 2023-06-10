import { TestBed } from '@angular/core/testing';

import { HRAuthGuardService } from './hr-auth-guard.service';

describe('HRAuthGuardService', () => {
  let service: HRAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
