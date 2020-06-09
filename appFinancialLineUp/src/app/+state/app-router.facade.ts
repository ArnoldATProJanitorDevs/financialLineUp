import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromRouteComponent from './app-router.reducer';
import * as RouteComponentSelectors from './app-router.selectors';
import { routerGo } from './app-router.actions';

@Injectable()
export class AppRouterFacade {

  constructor(
    private routerStore: Store<fromRouteComponent.RouteComponentPartialState>,
  ) {
  }

  navigateTo(paths: string[]){
    this.routerStore.dispatch(routerGo({path: paths}))
  }
}
