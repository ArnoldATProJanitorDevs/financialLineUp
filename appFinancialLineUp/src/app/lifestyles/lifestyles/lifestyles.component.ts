import {Component, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {ItemDictionary, Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Category} from "../../items/models/category.interface";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";
import {take} from "rxjs/operators";

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

    this.addSubscriptions();

  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
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

  OnDeleteLifestyle(lifestyle: Lifestyle) {
    this.DeleteLifeStyle(lifestyle);
  }

  DeleteLifeStyle(lifestyle: Lifestyle) {
    this.lifestyleFacade.deleteLifestyle([lifestyle]);
  }

  exportLifestyles() {

  }

  importLifestyles() {

  }

  shareLifestyles() {
    this.lifestyleFacade.pushLifeStyleIntoCloud(convertDictionaryToArray(this.Lifestyles));
  }

  deleteAllLifestyles() {

  }

  DuplicateLifestyle(lifestyle: Lifestyle) {
    const fixUuid = uuidv4();

    const Lifestyle: Lifestyle = {
      Id: fixUuid,
      TaxRates: lifestyle.TaxRates,
      Name: 'COPY ' + lifestyle.Name,
      Items: adjustLifestyleId(lifestyle.Items, fixUuid),
      Description: lifestyle.Description
    };

    function adjustLifestyleId(Items: ItemDictionary, Id: string) {
      Object.values(Items).map(item => item.LifestyleId = Id);

      return Items;
    }

    this.lifestyleFacade.updateLifestyles(Lifestyle);
    this.lifestyleFacade.updateLifestyleItem(Object.values(Lifestyle.Items));

  }

  trackById(lifestyle: Lifestyle) {
    return lifestyle.Id;
  }

  private addSubscriptions() {
    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = LifestylesComponent.makeDeepCopyForLocalModification(next);
      }
    ));
  }


}

function convertDictionaryToArray(dictionary: any) {

  let array = [];

  for (let key in dictionary) {
    array.push(dictionary[key]);
  }

  return array;
}

