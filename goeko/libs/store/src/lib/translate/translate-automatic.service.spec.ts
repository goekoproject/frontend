import { TestBed } from '@angular/core/testing';

import { TranslateAutomaticService } from './translate-automatic.service';

describe('TranslateAutomaticService', () => {
  let service: TranslateAutomaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateAutomaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
