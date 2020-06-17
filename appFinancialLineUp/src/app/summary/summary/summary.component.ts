import {Component, Input, OnInit} from '@angular/core';
import {IncomeNeeds} from "../models/incomeNeeds.interface";
import {ExpensesInterface} from "../models/expenses.interface";
import {roundToTwo} from "../../shared/globals/round-to-two";
import {Item} from "../../items/models/item.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() Taxrates: number[] = [];
  @Input() Items: Item[] = [];

  IncomeNeeds: IncomeNeeds = {
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

    this.IncomeNeeds.BeforeTaxes.Daily = monthlyExpensesBeforeTaxes * DAILYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Weekly = monthlyExpensesBeforeTaxes * WEEKLYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Monthly = monthlyExpensesBeforeTaxes * MONTHLYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Yearly = monthlyExpensesBeforeTaxes * YEARLYMULTIPLIER;

    this.IncomeNeeds.AfterTaxes = this.Taxrates.map((taxrate): ExpensesInterface => {
      const monthlyExpensesAfterTaxes = this.calculatePercentage(monthlyExpensesBeforeTaxes, taxrate);

      return {
        Daily: monthlyExpensesAfterTaxes * DAILYMULTIPLIER,
        Weekly: monthlyExpensesAfterTaxes * WEEKLYMULTIPLIER,
        Monthly: monthlyExpensesAfterTaxes * MONTHLYMULTIPLIER,
        Yearly: monthlyExpensesAfterTaxes * YEARLYMULTIPLIER
      }
    });
  }

  calculateTotal(input: number[]): number {
    return input.reduce((a, b) => a + b, 0);
  }

  calculatePercentage(amount: number, percentageInteger: number): number {
    return roundToTwo(amount / ((100 - percentageInteger) * 0.01));
  }
}


