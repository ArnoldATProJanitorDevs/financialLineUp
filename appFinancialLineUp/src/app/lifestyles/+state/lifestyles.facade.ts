import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as fromLifestyles from "./lifestyles.reducer";
import * as LifestyleComponentSelectors from './lifestyles.selectors';
import * as LifestyleActions from './lifestyles.actions';
import {ItemDictionary, Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../items/models/item.interface";
import {Observable} from "rxjs";


@Injectable()
export class LifestylesFacade {

  getLifeStylesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllLifestyles)
  );

  getCategoriesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllCategories)
  );

  getLifeStyleItems$ : Observable<ItemDictionary> = new Observable<ItemDictionary>();

  constructor(
    private lifestylesStore: Store<fromLifestyles.LifestylesPartialState>,
  ) {
  }

  dispatch(action: Action) {
    this.lifestylesStore.dispatch(action)
  }

  getLifeStylesAll() {
    return this.getLifeStylesAll$;
  }

  getLifeStyleById(Id: string) {
    return this.lifestylesStore.pipe(select(LifestyleComponentSelectors.getLifestyleById, {Id: Id}))
  }

  getCategoriesAll() {
    this.dispatch(LifestyleActions.loadCategories());
    return this.getCategoriesAll$;
  }

  pushLifeStyleIntoCloud(lifestyles: Lifestyle[]) {
    this.dispatch(LifestyleActions.createLifestyles({Lifestyles: lifestyles}))
  }

  deleteLifestyle(lifestyle: Lifestyle[]) {
    this.dispatch(LifestyleActions.deleteLifestyles({Lifestyles: lifestyle}))
  }


  updateLifestyles(Lifestyle: Lifestyle) {
    this.dispatch(LifestyleActions.updateLifestyle({Lifestyle: Lifestyle}))
  }

  updateLifestyleTaxes(LifestyleId:string, Taxes: number[]) {
    this.dispatch(LifestyleActions.updateLifestyleTaxes({LifestyleId: LifestyleId, Taxes: Taxes}))
  }

  updateLifestyleItem(Items: Item[]) {
    this.dispatch(LifestyleActions.updateLifestyleItems({Items: Items}))
  }

  getLifestyleItemsByLifestyleId(Id: string) {
    this.getLifeStyleItems$ = this.lifestylesStore.pipe(
      select(LifestyleComponentSelectors.getAllItemsOfLifestyleById, {Id: Id})
    );

    return this.getLifeStyleItems$;
  }

  deleteLifestyleItem(Item: Item) {
    this.dispatch(LifestyleActions.deleteLifestyleItem({Item: Item}))
  }

}
