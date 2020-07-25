import {Injectable} from '@angular/core';
import {Item} from "../items/models/item.interface";
import {ExpensesInterface} from "./models/expenses.interface";
import {SummaryComponent} from "./summary/summary.component";
import {IncomeNeeds} from "./models/incomeNeeds.interface";
import {roundToTwo} from "../shared/globals/round-to-two";

@Injectable({
  providedIn: 'root'
})
export class ExpensesCalculationService {

  constructor() {
  }


  calculateExpenses(Items: Item[], TaxRates: number[]): IncomeNeeds {

    let IncomeNeeds: IncomeNeeds = {
      BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
      AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
    };

    if (Items.length === 0 || TaxRates.length === 0 || Items.some(item => !item.Cost) || TaxRates.some(tr => !tr))
      return IncomeNeeds;

    const DAILYMULTIPLIER = 1 / 30;
    const WEEKLYMULTIPLIER = 1 / 4;
    const MONTHLYMULTIPLIER = 1;
    const YEARLYMULTIPLIER = 12;

    const monthlyExpensesBeforeTaxes = Items.length > 0 ? Items.map(item => item.Cost)?.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;

    IncomeNeeds.BeforeTaxes.Daily = monthlyExpensesBeforeTaxes * DAILYMULTIPLIER;
    IncomeNeeds.BeforeTaxes.Weekly = monthlyExpensesBeforeTaxes * WEEKLYMULTIPLIER;
    IncomeNeeds.BeforeTaxes.Monthly = monthlyExpensesBeforeTaxes * MONTHLYMULTIPLIER;
    IncomeNeeds.BeforeTaxes.Yearly = monthlyExpensesBeforeTaxes * YEARLYMULTIPLIER;

    IncomeNeeds.AfterTaxes = TaxRates?.map((taxrate): ExpensesInterface => {
      const monthlyExpensesAfterTaxes = this.calculatePercentage(monthlyExpensesBeforeTaxes, taxrate);

      return {
        Daily: monthlyExpensesAfterTaxes * DAILYMULTIPLIER,
        Weekly: monthlyExpensesAfterTaxes * WEEKLYMULTIPLIER,
        Monthly: monthlyExpensesAfterTaxes * MONTHLYMULTIPLIER,
        Yearly: monthlyExpensesAfterTaxes * YEARLYMULTIPLIER
      }
    });

    return IncomeNeeds;

  }

  private calculatePercentage(amount: number, percentageInteger: number): number {
    return roundToTwo(amount / ((100 - percentageInteger) * 0.01));
  }
}
