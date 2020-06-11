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

export const LIFESTYLE_FEATURE_KEY = 'lifestyles';

export interface State extends EntityState<LifeStylesEntity> {
  Lifestyles: LifestylesDictionary;
}

export interface LifestylesPartialState {
  readonly [LIFESTYLE_FEATURE_KEY]: State;
}

export const lifestylesComponentAdapter: EntityAdapter<LifeStylesEntity> = createEntityAdapter<LifeStylesEntity>();

export const initialState: State = lifestylesComponentAdapter.getInitialState({Lifestyles: {}});

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
  );

export function reducer(state: State | undefined, action: Action) {
  return lifeStyleReducer(state, action);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
