import { TestBed } from '@angular/core/testing';

import { EcosolutionsManagmentDocumentsService } from './ecosolutions-managment-documents.service';

describe('EcosolutionsManagmentDocumentsService', () => {
  let service: EcosolutionsManagmentDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcosolutionsManagmentDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
