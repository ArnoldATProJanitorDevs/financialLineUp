import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as AppComponentActions from './app-component.actions'
import {catchError, map,} from "rxjs/operators";
import {of} from "rxjs";


@Injectable()
export class AppComponentEffects {

  loadAppComponent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppComponentActions.loadAppComponent),
      map(() => AppComponentActions.loadAppComponentSuccess({appComponent: {}})),
      catchError(errorMessage => {
        return of(AppComponentActions.loadAppComponentFailure({error: errorMessage}))
      })
    )
  });


  constructor(private actions$: Actions) {
  }

}

