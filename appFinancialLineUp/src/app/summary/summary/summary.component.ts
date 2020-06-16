import {Component, Input, OnInit} from '@angular/core';
import {LifeStyleCosts} from "../../lifestyle/models/lifestylecosts.interface";
import {IncomeBasis} from "../../lifestyle/models/incomeBasis";
import {Item} from "../../item/models/item.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() Taxrates: number[] = [];
  @Input() Items: Item[] = [];

  Costs: LifeStyleCosts = {
    BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
    AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
  };

  constructor() {
  }

  ngOnInit(): void {
    this.calculateExpenses();
  }

  calculateExpenses() {

    const DAILYMULTIPLIER = 1 / 30;
    const WEEKLYMULTIPLIER = 1 / 4;
    const MONTHLYMULTIPLIER = 1;
    const YEARLYMULTIPLIER = 12;

    const monthlyExpensesBeforeTaxes = this.calculateTotal(this.Items.map(item => item.Cost));

    this.Costs.BeforeTaxes.Daily = monthlyExpensesBeforeTaxes * DAILYMULTIPLIER;
    this.Costs.BeforeTaxes.Weekly = monthlyExpensesBeforeTaxes * WEEKLYMULTIPLIER;
    this.Costs.BeforeTaxes.Monthly = monthlyExpensesBeforeTaxes * MONTHLYMULTIPLIER;
    this.Costs.BeforeTaxes.Yearly = monthlyExpensesBeforeTaxes * YEARLYMULTIPLIER;

    this.Costs.AfterTaxes = this.Taxrates.map((taxrate): IncomeBasis => {
      const monthlyExpensesAfterTaxes = this.calculatePercentage(monthlyExpensesBeforeTaxes, taxrate);

      return {
        Daily: monthlyExpensesAfterTaxes * DAILYMULTIPLIER,
        Weekly: monthlyExpensesAfterTaxes * WEEKLYMULTIPLIER,
        Monthly: monthlyExpensesAfterTaxes * MONTHLYMULTIPLIER,
        Yearly: monthlyExpensesAfterTaxes * YEARLYMULTIPLIER
      }
    });
  }

  calculateTotal(inputNumbers: number[]): number {
    return inputNumbers.reduce((a, b) => a + b, 0);
  }

  calculatePercentage(amount: number, percentageInteger: number): number {
    return roundToTwo(amount / ((100 - percentageInteger) * 0.01));
  }

}

function roundToTwo(num) {
  return +(`${Math.round(Number(`${num}e+2`))}e-2`);
}
