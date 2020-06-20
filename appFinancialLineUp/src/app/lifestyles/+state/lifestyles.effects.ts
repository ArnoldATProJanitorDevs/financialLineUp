import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Category} from "../../items/models/category.interface";
import {Item} from "../../items/models/item.interface";
import {DataBaseApiService} from "../../shared/data-base-connect/data-base-api.service";
import {v4 as uuidv4} from 'uuid';



//TODO: Get rid of both JSON
import LifeStyles_JsonArray from '../dummyLifeStyles.json'
import Categories_JsonArray from '../categories.json'
import {ExampleLifestyles} from "../models/lifestyle-example";

//TODO END: Get rid of both JSON

@Injectable()
export class LifestylesEffects {

  createLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.CreateLifestyles),
      map((a) => {
        this.dataBaseApiService.CreateLifeStyles(a.Lifestyles);
        return LifestylesActions.CreateLifestylesSuccess();
      }),
      catchError(errorMessage => {
        return of(LifestylesActions.CreateLifestylesFailure({error: errorMessage}))
      })
    )
  });

  loadExampleLifestyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadExampleLifestyles),
      switchMap(() => getExampleLifestyles().pipe(
        map((lifestyles) => {
          return LifestylesActions.loadExampleLifestylesSuccess({Lifestyles: convertArrayToDictionary(lifestyles)})
        }),
        catchError(errorMessage => {
          return of(LifestylesActions.loadExampleLifestylesFailure({error: errorMessage}))
        })
      ))
    )
  });

  loadLifeStyleById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadLifestylesById),
      switchMap((action) => this.dataBaseApiService.GetLifeStylesById(action.ids).pipe(
        map((lifestyle) => {
          const lifestyles: Lifestyle[] = [].concat(...lifestyle);
          return LifestylesActions.loadLifestylesByIdSuccess({Lifestyles: convertArrayToDictionary(lifestyles)})
        }),
        catchError(errorMessage => {
          return of(LifestylesActions.loadLifestylesFailure({error: errorMessage}))
        })
      ))
    )
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


  constructor(private actions$: Actions, private dataBaseApiService: DataBaseApiService) {
  }
}

function convertArrayToDictionary(lifestyles: Lifestyle[]) {
  const dictionary: LifestylesDictionary = {};
  lifestyles.map(lifestyle => {
    dictionary[lifestyle.Id] = {
      Id: lifestyle.Id,
      Name: lifestyle.Name,
      TaxRates: lifestyle.TaxRates,
      Description: lifestyle.Description,
      Items: lifestyle.Items ? castToItemArray(lifestyle.Items) : getDefaultItemArray(),
    };
  });
  return dictionary;
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

//TODO: replace for CRUD-Database operations
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

//TODO: Outsource
function getCategory(Categories: Category[], Category: any | Category) {

  const existingCategory = Categories.filter(cat => cat.name == Category)[0];

  return existingCategory ? existingCategory : Categories[0];
}

//TODO: Outsource
function castToItemArray(Items: any[]): Item[] {

  if (Items.length <= 0)
    return [];

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

//TODO: Outsource
function getDefaultCategory(): Category {
  return {
    icon: "house", name: "housing"

  }
}

//TODO: Outsource
function getDefaultItemArray(): Item[] {

  return [{
    Id: uuidv4(),
    Comment: 'NEW ITEM',
    Category: getDefaultCategory(),
    Cost: 0,
  }];
}

function getExampleLifestyles() {
  return of(ExampleLifestyles);
}

