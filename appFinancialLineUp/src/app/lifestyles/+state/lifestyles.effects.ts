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

@Injectable()
export class LifestylesEffects {

  createLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.createLifestyles),
      map((a) => {
        this.dataBaseApiService.CreateLifeStyles(a.Lifestyles);
        return LifestylesActions.createLifestylesSuccess();
      }),
      catchError(errorMessage => {
        return of(LifestylesActions.createLifestylesFailure({error: errorMessage}))
      })
    )
  });

  deleteLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.deleteLifestyles),
      map((a) => {
        a.Lifestyles.map(ls => this.dataBaseApiService.DeleteLifeStyle(ls.Id));
        return LifestylesActions.deleteLifestylesSuccess({Lifestyles: a.Lifestyles});
      }),
      catchError(errorMessage => {
        return of(LifestylesActions.deleteLifestylesFailure({error: errorMessage}))
      })
    )
  });

  loadExampleLifestyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadExampleLifestyles),
      switchMap(() => getExampleLifestylesAsObservable().pipe(
        map((lifestyles) => {
          return LifestylesActions.loadExampleLifestylesSuccess({Lifestyles: lifestyles})
        }),
        catchError(errorMessage => {
          return of(LifestylesActions.loadExampleLifestylesFailure({error: errorMessage}))
        })
      ))
    )
  });

  loadLifeStylesById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadLifestylesById),
      switchMap((action) => this.dataBaseApiService.GetLifeStylesById(action.ids).pipe(
        map((lifestyle) => {
          const lifestyles: Lifestyle[] = [].concat(...lifestyle);
          return LifestylesActions.loadLifestylesByIdSuccess({Lifestyles: convertArrayToDictionary(lifestyles, this.categoriesService)})
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
      switchMap(() => this.categoriesService.getCategoriesAsObservable().pipe(
        map((categories) => LifestylesActions.loadCategoriesSuccess({Categories: categories})),
        catchError(errorMessage => {
          return of(LifestylesActions.loadCategoriesFailure({error: errorMessage}))
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

export interface LifestylesDictionary {
  [id: string]: Lifestyle;
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


