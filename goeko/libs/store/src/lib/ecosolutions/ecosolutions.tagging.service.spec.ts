import { TestBed } from '@angular/core/testing';

import { EcosolutionsTaggingService } from './ecosolutions.tagging.service';

describe('EcosolutionsTaggingService', () => {
  let service: EcosolutionsTaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosolutionsTaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
