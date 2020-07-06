import { TestBed } from '@angular/core/testing';

import { ExpensesCalculationService } from './expenses-calculation.service';

describe('ExpensesCalculationService', () => {
  let service: ExpensesCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
