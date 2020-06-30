import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap, take} from "rxjs/operators";
import {of} from "rxjs";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";

import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";
import {getCategoriesAsObservable} from "../../shared/categories/categories";
import {getExampleLifestylesAsObservable} from "../models/lifestyle-example";

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
          return LifestylesActions.getLifestylesByIdSuccess({Lifestyles: convertLifestyleArrayToDictionary(lifestyles)})
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
      switchMap(() => getCategoriesAsObservable().pipe(
        map((categories) => LifestylesActions.getCategoriesSuccess({Categories: categories})),
        catchError(errorMessage => {
          return of(LifestylesActions.getCategoriesFailure({error: errorMessage}))
        })
      )))
  });

  constructor(private actions$: Actions, private dataBaseApiService: LifestyleDatabaseApiService) {
  }
}

function convertLifestyleArrayToDictionary(lifestyles: Lifestyle[]) {
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


