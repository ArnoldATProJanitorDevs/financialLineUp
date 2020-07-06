import { TestBed } from '@angular/core/testing';

import { ExportLifestylesService } from './export-lifestyles.service';

describe('ExportLifestylesService', () => {
  let service: ExportLifestylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportLifestylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
