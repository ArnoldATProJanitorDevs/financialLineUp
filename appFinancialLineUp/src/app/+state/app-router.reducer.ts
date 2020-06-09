import {Action, createReducer, on} from '@ngrx/store';
import {
  routerNavigationAction,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import * as RouteComponentActions from './app-router.actions';
import {ActivatedRouteSnapshot} from '@angular/router';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {RouteComponentEntity} from './app-router.models';


export const ROUTECOMPONENT_FEATURE_KEY = 'routerComponent';

export interface State extends EntityState<RouteComponentEntity> {
  routerState: SerializedRouterStateSnapshot;
}

export interface RouteComponentPartialState {
  readonly [ROUTECOMPONENT_FEATURE_KEY]: State;
}

export const routeComponentAdapter: EntityAdapter<RouteComponentEntity> = createEntityAdapter<RouteComponentEntity>();


export const initialState: State = routeComponentAdapter.getInitialState({
  entities: undefined,
  ids: undefined,
  routerState: new class implements SerializedRouterStateSnapshot {
    root: ActivatedRouteSnapshot;
    url: string;
  }
});


const reducer = createReducer(
  initialState,

  on(routerNavigationAction, (state, action) => {
    const routerState = action.payload.routerState;
    return {...state, routerState};
  }),
  on(RouteComponentActions.routerNoopAction, (state, action) => {
    return state;
  })
);

export function routeReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
