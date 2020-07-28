import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as fromLifestyles from './lifestyles.reducer';
import * as LifestyleComponentSelectors from './lifestyles.selectors';
import * as LifestyleActions from './lifestyles.actions';
import {Item} from '../../items/models/item.interface';
import {Observable} from 'rxjs';
import {Category} from '../../shared/categories/category.interface';
import {ItemDictionary} from '../../items/models/itemDictionary.interface';
import {Lifestyle} from '../../lifestyle/models/lifestyle.interface';
import {CategoryGroups} from '../../shared/categories/category-groups.interface';


@Injectable()
export class LifestylesFacade {

  getLifeStylesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllLifestyles)
  );

  getCategoriesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllCategories)
  );

  getCategoryGroupsAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllCategoryGroups)
  );

  getLifeStyleItems$: Observable<ItemDictionary> = new Observable<ItemDictionary>();

  constructor(
    private lifestylesStore: Store<fromLifestyles.LifestylesPartialState>,
  ) {
    this.initStore();
  }

  initStore() {
    this.dispatch(LifestyleActions.getCategoryGroups());
    this.dispatch(LifestyleActions.getCategories());
  }

  dispatch(action: Action) {
    this.lifestylesStore.dispatch(action);
  }

  getLifeStylesAll() {
    return this.getLifeStylesAll$;
  }

  getLifeStyleById(Id: string) {
    return this.lifestylesStore.pipe(select(LifestyleComponentSelectors.getLifestyleById, {Id}));
  }

  getCategoriesAll(): Observable<Category[]> {
    return this.getCategoriesAll$;
  }

  getCategoryGroupsAll(): Observable<CategoryGroups[]> {
    return this.getCategoryGroupsAll$;
  }

  pushLifeStyleIntoCloud(lifestyles: Lifestyle[]) {
    this.dispatch(LifestyleActions.saveLifestyleToDatabase({Lifestyles: lifestyles}));
  }

  deleteLifestyle(lifestyle: Lifestyle[], onlyLocal: boolean) {
    this.dispatch(LifestyleActions.deleteLifestylesLocalAndDatabase({Lifestyles: lifestyle, onlyLocal}));
  }


  updateLifestyles(Lifestyle: Lifestyle) {
    this.dispatch(LifestyleActions.updateLifestyle({Lifestyle}));
  }

  updateLifestyleTaxes(LifestyleId: string, Taxes: number[]) {
    this.dispatch(LifestyleActions.updateLifestyleTaxes({LifestyleId, Taxes}));
  }

  updateLifestyleItem(Items: Item[]) {
    this.dispatch(LifestyleActions.updateLifestyleItems({Items}));
  }

  getLifestyleItemsByLifestyleId(Id: string) {
    this.getLifeStyleItems$ = this.lifestylesStore.pipe(
      select(LifestyleComponentSelectors.getAllItemsOfLifestyleById, {Id})
    );

    return this.getLifeStyleItems$;
  }

  deleteLifestyleItem(ItemToExport: Item) {
    this.dispatch(LifestyleActions.deleteLifestyleItem({Item: ItemToExport}));
  }

  exportLifestyles(LifestylesToExport: Lifestyle[]) {
    this.dispatch(LifestyleActions.exportLifestyles({Lifestyles: LifestylesToExport}));
  }

}
