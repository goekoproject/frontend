import { TestBed } from '@angular/core/testing';

import { EcosolutionsSearchService } from './ecosolutions-search.service';

describe('EcosolutionsSearchService', () => {
  let service: EcosolutionsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosolutionsSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
