import { TestBed } from '@angular/core/testing';

import { ClassificationsService } from './classifications.service';

describe('ClassificationsService', () => {
  let service: ClassificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
