import { TestBed } from '@angular/core/testing';

import { ClassificationsDocumentsService } from './classifications-documents.service';

describe('ClassificationsDocumentsService', () => {
  let service: ClassificationsDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationsDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
