import {Injectable} from '@angular/core';
import {act, Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap, take} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Category} from "../../items/models/category.interface";
import {Item} from "../../items/models/item.interface";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";
import {v4 as uuidv4} from 'uuid';



//TODO: Get rid of JSON
import Categories_JsonArray from '../categories.json'

import {ExampleLifestyles} from "../models/lifestyle-example";
import {Categories} from "../../shared/categories/categories";
import {CategoriesService} from "../../shared/categories/categories.service";

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
      switchMap(() => getExampleLifestylesAsObservable().pipe(
        map((lifestyles) => {
          return LifestylesActions.loadExampleLifestylesSuccess({Lifestyles: convertArrayToDictionary(lifestyles, this.categoriesService)})
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
      Items: castToItemArray(lifestyle.Items, categoriesService),
    };
  });
  return dictionary;
}

export interface LifestylesDictionary {
  [id: string]: Lifestyle;
}

function castToItemArray(Items: any[] = [],categoriesService: CategoriesService ): Item[] {

  if (Items.length <= 0)
    return [{
      Id: uuidv4(),
      Comment: 'NEW ITEM',
      Category: categoriesService.getDefaultCategory(),
      Cost: 0,
    }];

  return Items.map(newItem => {
    return {
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

