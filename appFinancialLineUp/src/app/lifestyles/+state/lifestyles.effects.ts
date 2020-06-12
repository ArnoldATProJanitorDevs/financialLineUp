import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

import LifeStyles_JsonArray from '../dummyLifeStyles.json'
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.enum";


@Injectable()
export class LifestylesEffects {

  loadLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadLifestyles),
      switchMap(() => dummyFunctionSimulateReturnOfObservable().pipe(
        map((lifestyles) => LifestylesActions.loadLifestylesSuccess({Lifestyles: lifestyles})),
        catchError(errorMessage => {
          return of(LifestylesActions.loadLifestylesFailure({error: errorMessage}))
        })
      )))
  });


  constructor(private actions$: Actions) {
  }
}


function dummyFunctionSimulateReturnOfObservable(): Observable<{ [id: string]: Lifestyle; }> {

  let Lifestyles: LifestylesDictionary = {};

  LifeStyles_JsonArray.map(lifestyle => {
    Lifestyles[lifestyle.Id] = {
      Id: lifestyle.Id,
      Name: lifestyle.Name,
      TaxRates: lifestyle.TaxRates,
      Description: lifestyle.Description,
      Items: castToItem(lifestyle.Items)
    };
  });

  return of(Lifestyles);
}

export interface LifestylesDictionary {
  [id: string]: Lifestyle;
}


function castToItem(Items: any): Item[] {
  return Items.map(itemNew => {
    return {
      Id: itemNew.Id,
      Tag: itemNew.Tag,
      CategoryIcon: itemNew.CategoryIcon,
      Category: itemNew.Category,
      Cost: Number(itemNew.Cost),
    };
  })

}
