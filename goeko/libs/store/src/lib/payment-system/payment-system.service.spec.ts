import { TestBed } from '@angular/core/testing';

import { PaymentSystemService } from './payment-system.service';

describe('PaymentSystemService', () => {
  let service: PaymentSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
