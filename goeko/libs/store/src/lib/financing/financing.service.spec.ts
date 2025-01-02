import { TestBed } from '@angular/core/testing';

import { FinancingService } from './financing.service';

describe('FinancingService', () => {
  let service: FinancingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
