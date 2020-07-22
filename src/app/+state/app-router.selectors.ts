import { createFeatureSelector, createSelector } from '@ngrx/store';
import { routeComponentAdapter, ROUTECOMPONENT_FEATURE_KEY, RouteComponentPartialState, State } from './app-router.reducer';

export const getRouteComponentState = createFeatureSelector<RouteComponentPartialState,
  State>(ROUTECOMPONENT_FEATURE_KEY);

const { selectAll, selectEntities } = routeComponentAdapter.getSelectors();


export const getAllRouteComponent = createSelector(
  getRouteComponentState,
  (state: State) => selectAll(state)
);

export const getRouteComponentEntities = createSelector(
  getRouteComponentState,
  (state: State) => selectEntities(state)
);
