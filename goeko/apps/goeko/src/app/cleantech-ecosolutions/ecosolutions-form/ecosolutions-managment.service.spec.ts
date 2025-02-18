import { TestBed } from '@angular/core/testing';

import { EcosolutionsManagmentService } from './ecosolutions-managment.service';

describe('EcosolutionsManagmentService', () => {
  let service: EcosolutionsManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosolutionsManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
