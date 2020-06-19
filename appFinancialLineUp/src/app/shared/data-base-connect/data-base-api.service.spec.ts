import {TestBed} from '@angular/core/testing';

import {DataBaseApiService} from './data-base-api.service';

describe('DataBaseApiService', () => {
  let service: DataBaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBaseApiService);
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
