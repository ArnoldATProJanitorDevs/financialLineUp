import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {deepCopy} from "../../shared/globals/deep-copy";
import {Subscription} from "rxjs";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";

@Component({
  selector: 'app-taxrates',
  templateUrl: './taxrates.component.html',
  styleUrls: ['./taxrates.component.scss']
})
export class TaxratesComponent implements OnChanges, OnDestroy {

  @Input() LifestyleId: string;

  TaxRates: number[];

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unsubscribeAll();
    this.setUpSubscriptions();
  }

  updateTaxrate(i: number, value: number) {
    this.TaxRates[i] = value;
    this.updateTaxesInStore(this.LifestyleId, this.TaxRates);
  }

  HandleAddTaxrateButton() {
    this.addTaxrate();
  }

  HandleDeleteTaxrateButton(index: number) {
    this.deleteTaxrate(index);
  }

  trackByNumber(taxrate: number){
    return taxrate;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private setUpSubscriptions() {
    this.subs.push(this.lifestyleFacade.getLifeStyleById(this.LifestyleId).subscribe(next => {
        this.TaxRates = deepCopy(next.TaxRates);
      }
    ));
  }

  private addTaxrate() {
    this.TaxRates.push(0);
    this.updateTaxesInStore(this.LifestyleId, this.TaxRates);
  }

  private deleteTaxrate(index: number) {
    this.TaxRates.splice(index, 1);
    this.updateTaxesInStore(this.LifestyleId, this.TaxRates);
  }

  private updateTaxesInStore(LifestyleId: string, TaxRates: number[]) {
    this.lifestyleFacade.updateLifestyleTaxes(LifestyleId, TaxRates);
  }

  private unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
