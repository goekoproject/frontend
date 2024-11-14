import { TestBed } from '@angular/core/testing';

import { ProjectManagmenetService } from './project-managmenet.service';

describe('ProjectManagmenetService', () => {
  let service: ProjectManagmenetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagmenetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
