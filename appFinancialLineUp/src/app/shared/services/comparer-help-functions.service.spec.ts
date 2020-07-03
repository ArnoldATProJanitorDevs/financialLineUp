import { TestBed } from '@angular/core/testing';

import { ComparerHelpFunctionsService } from './comparer-help-functions.service';

describe('ComparerHelpFunctionsService', () => {
  let service: ComparerHelpFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparerHelpFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
