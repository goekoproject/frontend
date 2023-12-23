import { TestBed } from '@angular/core/testing';

import { EcosolutionsService } from './ecosolutions.service';

describe('EcosolutionsService', () => {
  let service: EcosolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
