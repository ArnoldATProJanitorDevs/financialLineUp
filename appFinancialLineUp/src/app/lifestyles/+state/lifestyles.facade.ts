import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';

import * as fromLifestyles from "./lifestyles.reducer";
import * as LifestyleComponentSelectors from './lifestyles.selectors';
import * as LifestyleActions from './lifestyles.actions';
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Injectable()
export class LifestylesFacade {

  getLifeStylesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllLifestyles)
  );

  getCategoriesAll$ = this.lifestylesStore.pipe(
    select(LifestyleComponentSelectors.getAllCategories)
  );

  constructor(
    private lifestylesStore: Store<fromLifestyles.LifestylesPartialState>,
  ) {
  }

  dispatch(action: Action){
    this.lifestylesStore.dispatch(action)
  }

  getLifeStylesAll(){
    // this.dispatch(LifestyleActions.loadLifestyles());
    return this.getLifeStylesAll$;
  }

  getCategoriesAll(){
    this.dispatch(LifestyleActions.loadCategories());
    return this.getCategoriesAll$;
  }

  pushLifeStyleIntoCloud(lifestyles: Lifestyle[]){
    this.dispatch(LifestyleActions.CreateLifestyles({Lifestyles: lifestyles}))
  }

}
