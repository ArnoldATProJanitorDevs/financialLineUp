import {Component, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {ItemDictionary, Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy {

  Lifestyles$: Observable<LifestylesDictionary>;
  Lifestyles: LifestylesDictionary = {};


  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade,
  ) {
  }

  private static makeDeepCopyForLocalModification(object: any) {
    return deepCopy(object);
  }

  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();

    this.setUpSubscriptions();

  }


  addNewLifestyle() {
    const lifestyleId = uuidv4();
    const itemId = uuidv4();

    const Lifestyle: Lifestyle = {
      Id: lifestyleId,
      Name: 'NEW LIFESTYLE',
      TaxRates: [40],
      Description: 'NEW DESCRIPTION',
      Items: {
        [itemId]: {
          LifestyleId: lifestyleId,
          Id: itemId,
          Cost: 20,
          Category: {name: 'housing', icon: 'home'},
          Comment: "Rent"
        },
      }
    };

    this.lifestyleFacade.updateLifestyles(Lifestyle);
  }

  exportLifestyles(lifestyles: LifestylesDictionary) {

  }

  importLifestyles() {

  }

  shareLifestyles() {
    this.lifestyleFacade.pushLifeStyleIntoCloud(convertDictionaryToArray(this.Lifestyles));
  }

  trackById(lifestyle: Lifestyle): string {
    return lifestyle.Id;
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

  private setUpSubscriptions() {
    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = LifestylesComponent.makeDeepCopyForLocalModification(next);
      }
    ));
  }

}
