import { TestBed } from '@angular/core/testing';

import { ResendApiService } from './resend-api.service';

describe('ResendApiService', () => {
  let service: ResendApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResendApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
