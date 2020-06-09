import { createFeatureSelector, createSelector } from '@ngrx/store';

import {LIFESTYLE_FEATURE_KEY, lifestylesComponentAdapter, LifestylesPartialState, State} from './lifestyles.reducer';

export const getLifestylesComponentState = createFeatureSelector<LifestylesPartialState,
  State>(LIFESTYLE_FEATURE_KEY);

const { selectAll, selectEntities } = lifestylesComponentAdapter.getSelectors();


export const getAllLifestylesComponent = createSelector(
  getLifestylesComponentState,
  (state: State) => selectAll(state)
);

export const getLifestylesComponentEntities = createSelector(
  getLifestylesComponentState,
  (state: State) => selectEntities(state)
);



