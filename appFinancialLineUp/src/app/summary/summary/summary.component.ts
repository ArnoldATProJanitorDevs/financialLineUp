import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IncomeNeeds} from "../models/incomeNeeds.interface";
import {ExpensesInterface} from "../models/expenses.interface";
import {roundToTwo} from "../../shared/globals/round-to-two";
import {Item} from "../../items/models/item.interface";
import {deepCopy} from "../../shared/globals/deep-copy";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {combineLatest, Subscription} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  TaxRates: number[] = [];
  @Input() Items: Item[] = [];
  IncomeNeeds: IncomeNeeds = {
    BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
    AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
  };
  private _lifestyleId: string;
  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }

  get LifestyleId(): string {

    return this._lifestyleId;
  }

  @Input() set LifestyleId(value: string) {

    this._lifestyleId = value;
    this.setSubscriptionOnInputChange();
  }

  setSubscriptionOnInputChange() {
    this.unsubscribeAll();
    this.setUpSubscriptions();
  }

  setUpSubscriptions() {

    this.subs.push(combineLatest(
      [this.lifestyleFacade.getLifestyleItemsByLifestyleId(this.LifestyleId),
        this.lifestyleFacade.getLifeStyleById(this.LifestyleId)],
      (items, lifestyle) => {
        this.TaxRates = deepCopy(lifestyle?.TaxRates|| []) as number[];
        this.calculateExpenses(Object.values(items), this.TaxRates);

      }
    ).subscribe());
  }

  unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  calculateExpenses(Items: Item[], TaxRates: number[]) {

    const DAILYMULTIPLIER = 1 / 30;
    const WEEKLYMULTIPLIER = 1 / 4;
    const MONTHLYMULTIPLIER = 1;
    const YEARLYMULTIPLIER = 12;

    const monthlyExpensesBeforeTaxes = Items.length > 0 ? Items.map(item => item.Cost)?.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;

    this.IncomeNeeds.BeforeTaxes.Daily = monthlyExpensesBeforeTaxes * DAILYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Weekly = monthlyExpensesBeforeTaxes * WEEKLYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Monthly = monthlyExpensesBeforeTaxes * MONTHLYMULTIPLIER;
    this.IncomeNeeds.BeforeTaxes.Yearly = monthlyExpensesBeforeTaxes * YEARLYMULTIPLIER;

    this.IncomeNeeds.AfterTaxes = TaxRates?.map((taxrate): ExpensesInterface => {
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


