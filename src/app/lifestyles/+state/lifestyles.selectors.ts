import { createFeatureSelector, createSelector } from '@ngrx/store';

import {LIFESTYLE_FEATURE_KEY, lifestylesComponentAdapter, LifestylesPartialState, State} from './lifestyles.reducer';
export const getLifestylesComponentState = createFeatureSelector<LifestylesPartialState,
  State>(LIFESTYLE_FEATURE_KEY);

const { selectAll, selectEntities } = lifestylesComponentAdapter.getSelectors();



export const getAllLifestyles = createSelector(
  getLifestylesComponentState,
  (state: State) => state.Lifestyles
);

export const getLifestyleById = createSelector(
  getLifestylesComponentState,
  (state: State, props) => state.Lifestyles[props.Id]
);

export const getAllCategories = createSelector(
  getLifestylesComponentState,
  (state: State) => state.Categories
);

export const getAllCategoryGroups = createSelector(
  getLifestylesComponentState,
  (state: State) => state.CategoryGroups
);


export const getAllItemsOfLifestyleById = createSelector(
  getLifestylesComponentState,
  (state: State, props) => state.Lifestyles[props.Id]?.Items || {}
);


