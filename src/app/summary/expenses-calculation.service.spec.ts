import {TestBed} from '@angular/core/testing';

import {ExpensesCalculationService} from './expenses-calculation.service';
import {getExampleLifestyles} from "../lifestyles/models/lifestyle-example";
import {Item} from "../items/models/item.interface";

describe('ExpensesCalculationService', () => {
  let service: ExpensesCalculationService;
  let testItems: Item[];
  let testTaxrates: number[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesCalculationService);

    const exampleLifestyles = Object.values(getExampleLifestyles());
    testItems = exampleLifestyles.map(el => Object.values(el.Items)).reduce((accumulator, currentValue) => accumulator.concat(currentValue));
    testTaxrates = exampleLifestyles.map(el => el.TaxRates).reduce((accumulator, currentValue) => accumulator.concat(currentValue));

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calculateExpenses - should calculate correctly', () => {

    const ExpectedResult = {
      BeforeTaxes: {
        Daily: 2.6666666666666665, Weekly: 20, Monthly: 80, Yearly: 960
      },
      AfterTaxes: [{
        Daily: 4.597666666666667,
        Weekly: 34.4825,
        Monthly: 137.93,
        Yearly: 1655.16
      },
        {
          Daily: 4.102666666666667,
          Weekly: 30.77,
          Monthly: 123.08,
          Yearly: 1476.96
        }]

    }
    const calculatedExpensesArray = service.calculateExpenses(testItems, testTaxrates);
    expect(calculatedExpensesArray).toEqual(ExpectedResult);
  });

  it('calculateExpenses - should return zero values for invalid cost of an Item', () => {

    testItems[0].Cost = undefined;

    let ExpectedResult = {
      BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
      AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
    };

    const calculatedExpensesArray = service.calculateExpenses(testItems, testTaxrates);
    expect(calculatedExpensesArray).toEqual(ExpectedResult);
  });

  it('calculateExpenses - should return zero values for invalid taxRates', () => {

    testTaxrates[0] = undefined;

    let ExpectedResult = {
      BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
      AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
    };

    const calculatedExpensesArray = service.calculateExpenses(testItems, testTaxrates);
    expect(calculatedExpensesArray).toEqual(ExpectedResult);
  });

  it('calculatePercentage - should calculated correctly', () => {
    const percentage = (service as any).calculatePercentage(100, 50);
    expect(percentage).toBe(200);
  });

});
