import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap, take} from "rxjs/operators";
import {of} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../items/models/item.interface";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";
import {v4 as uuidv4} from 'uuid';

import {ExampleLifestyles} from "../models/lifestyle-example";
import {CategoriesService} from "../../shared/categories/categories.service";
import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";

@Injectable()
export class LifestylesEffects {

  saveLifestyleToDatabase$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.saveLifestyleToDatabase),
      map((a) => {
        this.dataBaseApiService.CreateLifeStyles(a.Lifestyles);
        return LifestylesActions.saveLifestyleToDatabaseSuccess();
      }),
      catchError(errorMessage => {
        return of(LifestylesActions.saveLifestyleToDatabaseFailure({error: errorMessage}))
      })
    )
  });

  deleteLifestylesLocalAndDatabase$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.deleteLifestylesLocalAndDatabase),
      map((a) => {
        a.Lifestyles.map(ls => this.dataBaseApiService.DeleteLifeStyle(ls.Id));
        return LifestylesActions.deleteLifestylesLocalAndDatabaseSuccess({Lifestyles: a.Lifestyles});
      }),
      catchError(errorMessage => {
        return of(LifestylesActions.deleteLifestylesLocalAndDatabaseFailure({error: errorMessage}))
      })
    )
  });

  getExampleLifestyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.getExampleLifestyles),
      switchMap(() => getExampleLifestylesAsObservable().pipe(
        map((lifestyles) => {
          return LifestylesActions.getExampleLifestylesSuccess({Lifestyles: lifestyles})
        }),
        catchError(errorMessage => {
          return of(LifestylesActions.getExampleLifestylesFailure({error: errorMessage}))
        })
      ))
    )
  });

  getLifestylesById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.getLifestylesById),
      switchMap((action) => this.dataBaseApiService.GetLifeStylesById(action.ids).pipe(
        map((lifestyle) => {
          const lifestyles: Lifestyle[] = [].concat(...lifestyle);
          return LifestylesActions.getLifestylesByIdSuccess({Lifestyles: convertArrayToDictionary(lifestyles, this.categoriesService)})
        }),
        catchError(errorMessage => {
          return of(LifestylesActions.getLifestylesByIdFailure({error: errorMessage}))
        })
      ))
    )
  });

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.getCategories),
      switchMap(() => this.categoriesService.getCategoriesAsObservable().pipe(
        map((categories) => LifestylesActions.getCategoriesSuccess({Categories: categories})),
        catchError(errorMessage => {
          return of(LifestylesActions.getCategoriesFailure({error: errorMessage}))
        })
      )))
  });

  constructor(private actions$: Actions, private dataBaseApiService: LifestyleDatabaseApiService, private categoriesService: CategoriesService) {
  }
}

function convertArrayToDictionary(lifestyles: Lifestyle[], categoriesService: CategoriesService) {
  const dictionary: LifestylesDictionary = {};
  lifestyles.map(lifestyle => {
    dictionary[lifestyle.Id] = {
      Id: lifestyle.Id,
      Name: lifestyle.Name,
      TaxRates: lifestyle.TaxRates,
      Description: lifestyle.Description,
      Items: lifestyle.Items,
    };
  });
  return dictionary;
}



function castToItemArray(lifestyleId: string, Items: any[] = [], categoriesService: CategoriesService): Item[] {

  const NEWITEM = 'NEW ITEM';

  if (Items.length <= 0)
    return [{
      LifestyleId:lifestyleId,
      Id: uuidv4(),
      Comment: NEWITEM,
      Category: categoriesService.getDefaultCategory(),
      Cost: 0,
    }];

  return Items.map(newItem => {
    return {
      LifestyleId:lifestyleId,
      Id: newItem.Id,
      Comment: newItem.Comment,
      Category: categoriesService.getExistingCategoryOrDefault(newItem.Category),
      Cost: Number(newItem.Cost),
    };
  })
}

function getExampleLifestylesAsObservable() {
  return of(ExampleLifestyles);
}

function getExampleLifestyles() {
  return ExampleLifestyles;
}


