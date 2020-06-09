import { TestBed } from '@angular/core/testing';

import { RoleValidatorService } from './role-validator.service';

describe('RoleValidatorService', () => {
  let service: RoleValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
