import {
  Action,
  createReducer,
  MetaReducer, on
} from '@ngrx/store';
import {environment} from "../../../environments/environment.prod";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LifeStylesEntity} from "./lifestyles.model";
import * as LifestylesActions from './lifestyles.actions'
import {LifestylesDictionary} from "./lifestyles.effects";
import {Category} from "../../items/models/category.interface";


export const LIFESTYLE_FEATURE_KEY = 'lifestyles';

export interface State extends EntityState<LifeStylesEntity> {
  Lifestyles: LifestylesDictionary;
  Categories: Category[];
}

export interface LifestylesPartialState {
  readonly [LIFESTYLE_FEATURE_KEY]: State;
}

export const lifestylesComponentAdapter: EntityAdapter<LifeStylesEntity> = createEntityAdapter<LifeStylesEntity>();

export const initialState: State = lifestylesComponentAdapter.getInitialState({
  Lifestyles: {},
  Categories: [],
});

const lifeStyleReducer = createReducer(
  initialState,
  on(LifestylesActions.loadLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.loadLifestylesSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.loadLifestylesFailure, (state, {error}) => {
      return {...state, error}
    }
  ),
  on(LifestylesActions.loadCategories, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.loadCategoriesSuccess, (state, {Categories}) => {
      return {...state, Categories}
    }
  ),
  on(LifestylesActions.loadCategoriesFailure, (state, {error}) => {
      return {...state, error}
    }
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return lifeStyleReducer(state, action);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
