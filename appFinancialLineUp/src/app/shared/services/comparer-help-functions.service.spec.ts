import { TestBed } from '@angular/core/testing';

import { LifestyleComparingService } from './lifestyle-comparing.service';

describe('ComparerHelpFunctionsService', () => {
  let service: LifestyleComparingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifestyleComparingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
