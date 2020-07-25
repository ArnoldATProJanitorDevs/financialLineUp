import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IncomeNeeds} from "../models/incomeNeeds.interface";
import {ExpensesInterface} from "../models/expenses.interface";
import {roundToTwo} from "../../shared/globals/round-to-two";
import {Item} from "../../items/models/item.interface";
import {deepCopy} from "../../shared/globals/deep-copy";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {combineLatest, Subscription} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {ExpensesCalculationService} from "../expenses-calculation.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  TaxRates: number[] = [];
  Items: Item[] = [];
  IncomeNeeds: IncomeNeeds = {
    BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
    AfterTaxes: [{Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0}]
  };
  private _lifestyleId: string;
  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade,
              private expensesCalculationService: ExpensesCalculationService
              ) {
  }

  get LifestyleId(): string {
    return this._lifestyleId;
  }

  @Input() set LifestyleId(value: string) {
    this._lifestyleId = value;
    this.setSubscriptionOnInputChange();
  }

  setUpSubscriptions() {

    //TODO: Why fetching all Items and the lifestyle? Why not just lifestyle and grab the items of it directly?!
    this.subs.push(combineLatest(
      [this.lifestyleFacade.getLifestyleItemsByLifestyleId(this.LifestyleId),
        this.lifestyleFacade.getLifeStyleById(this.LifestyleId)],
      (items, lifestyle) => {
        this.TaxRates = deepCopy(lifestyle?.TaxRates || []) as number[];
        this.IncomeNeeds = this.expensesCalculationService.calculateExpenses(Object.values(items), this.TaxRates);
      }
    ).subscribe());
  }

  private setSubscriptionOnInputChange() {
    this.unsubscribeAll();
    this.setUpSubscriptions();
  }

  private unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}


