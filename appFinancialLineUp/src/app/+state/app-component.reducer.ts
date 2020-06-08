import {
  Action,
  createReducer,
  MetaReducer, on
} from '@ngrx/store';
import * as AppComponentActions from './app-component.actions'
import { environment } from '../../environments/environment';

export const APPCOMPONENT_FEATURE_KEY = 'appComponent';

export interface State {
  loaded: boolean;
  error?: string | null;
}

export interface AppComponentPartialState {
  readonly [APPCOMPONENT_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false
};


const appComponentReducer = createReducer(
  initialState,
  on(AppComponentActions.loadAppComponent, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AppComponentActions.loadAppComponentSuccess, (state, { appComponent }) => ({
      ...state
  })
  ),
  on(AppComponentActions.loadAppComponentFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return appComponentReducer(state, action);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
