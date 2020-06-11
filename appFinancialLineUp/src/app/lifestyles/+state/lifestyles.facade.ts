import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as fromLifestyles from "./lifestyles.reducer";
import * as LifestyleComponentSelectors from './lifestyles.selectors';
import * as LifestyleActions from './lifestyles.actions';

@Injectable()
export class LifestylesFacade {

  getLifeStylesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllLifestyles)
  );

  constructor(
    private lifestylesStore: Store<fromLifestyles.LifestylesPartialState>,
  ) {
  }

  dispatch(action: Action){
    this.lifestylesStore.dispatch(action)
  }

  getLifeStylesAll(){
    this.dispatch(LifestyleActions.loadLifestyles());
    return this.getLifeStylesAll$;
  }
}
