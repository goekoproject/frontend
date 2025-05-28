import { TestBed } from '@angular/core/testing';

import { RequestOnboardingService } from './request-onboarding.service';

describe('RequestOnboardingService', () => {
  let service: RequestOnboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestOnboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
