import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as LifestylesActions from './lifestyles.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {Observable, Observer, of} from "rxjs";


@Injectable()
export class LifestylesEffects {

  loadLifeStyles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LifestylesActions.loadLifestyles),
      switchMap(() => dummyFunctionForCompletingStatesOrder().pipe(
        map((lifestyles) => LifestylesActions.loadLifestylesSuccess({lifestyles: lifestyles})),
        catchError(errorMessage => {
          return of(LifestylesActions.loadLifestylesFailure({error: errorMessage}))
        })
      )))
  });


  constructor(private actions$: Actions) {
  }

}

function dummyFunctionForCompletingStatesOrder(): Observable<string> {
  return of("LifeStyles");
}
