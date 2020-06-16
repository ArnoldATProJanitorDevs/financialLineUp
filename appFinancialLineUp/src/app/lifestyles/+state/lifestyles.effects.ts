import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

import LifeStyles_JsonArray from '../dummyLifeStyles.json'
import Categories_JsonArray from '../categories.json'
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.interface";


@Injectable()
export class LifestylesEffects {

  loadLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadLifestyles),
      switchMap(() => dummyFunctionSimulateReturnOfLifestylesObservable().pipe(
        map((lifestyles) => LifestylesActions.loadLifestylesSuccess({Lifestyles: lifestyles})),
        catchError(errorMessage => {
          return of(LifestylesActions.loadLifestylesFailure({error: errorMessage}))
        })
      )))
  });

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadCategories),
      switchMap(() => dummyFunctionSimulateReturnOfCategoriesObservable().pipe(
        map((categories) => LifestylesActions.loadCategoriesSuccess({Categories: categories})),
        catchError(errorMessage => {
          return of(LifestylesActions.loadCategoriesFailure({error: errorMessage}))
        })
      )))
  });


  constructor(private actions$: Actions) {
  }
}

//TODO: replace for CRUD-Database operations
function dummyFunctionSimulateReturnOfLifestylesObservable(): Observable<{ [id: string]: Lifestyle; }> {

  let Lifestyles: LifestylesDictionary = {};

  LifeStyles_JsonArray.map(lifestyle => {
    Lifestyles[lifestyle.Id] = {
      Id: lifestyle.Id,
      Name: lifestyle.Name,
      TaxRates: lifestyle.TaxRates,
      Description: lifestyle.Description,
      Items: castToItem(lifestyle.Items),
    };
  });

  return of(Lifestyles);
}

export interface LifestylesDictionary {
  [id: string]: Lifestyle;
}

//TODO: replace for CRUD-Database operations
function dummyFunctionSimulateReturnOfCategoriesObservable(): Observable<Category[]> {

  const categories = Categories_JsonArray.map((category): Category => {
    return {
      name: category.name || 'home',
      icon: category.icon || 'housing'
    };
  });
  return of(categories);
}


function getCategoriesFromJson(): Category[] {
  const Categories: Category[] = Categories_JsonArray.map(cat => {
    const category: Category = {
      icon: cat.icon,
      name: cat.name
    };
    return category;
  });

  return Categories;
}

function getCategory(Categories: Category[], Category: any | Category) {

  const existingCategory = Categories.filter(cat => cat.name == Category)[0];

  return existingCategory ? existingCategory : Categories[0];
}

function castToItem(Items: any): Item[] {

  const Categories: Category[] = getCategoriesFromJson();

  return Items.map(itemNew => {
    return {
      Id: itemNew.Id,
      Comment: itemNew.Comment,
      Category: getCategory(Categories, itemNew.Category),
      Cost: Number(itemNew.Cost),
    };
  })

}
