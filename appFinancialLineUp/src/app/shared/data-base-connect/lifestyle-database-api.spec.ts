import {TestBed} from '@angular/core/testing';

import {LifestyleDatabaseApiService} from './lifestyle-database-api.service';

describe('DataBaseApiService', () => {
  let service: LifestyleDatabaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifestyleDatabaseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('CreateLifeStyles - missing test', () => {
    expect(0).toBeTruthy();
  });

  it('GetLifeStyles - missing test', () => {
    expect(0).toBeTruthy();
  });
  it('GetLifeStylesById - missing test', () => {
    expect(0).toBeTruthy();
  });
  it('UpdateLifeStyle - missing test', () => {
    expect(0).toBeTruthy();
  });
  it('DeleteLifeStyle- missing test', () => {
    expect(0).toBeTruthy();
  });
});
