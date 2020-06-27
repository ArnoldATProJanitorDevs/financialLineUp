import {
  Action, createAction,
  createReducer, createSelector,
  MetaReducer, on, props
} from '@ngrx/store';
import {environment} from "../../../environments/environment.prod";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LifeStylesEntity} from "./lifestyles.model";
import * as LifestylesActions from './lifestyles.actions'
import {LifestylesDictionary} from "./lifestyles.effects";
import {Category} from "../../items/models/category.interface";
import {deepCopy} from "../../shared/globals/deep-copy";
import {ItemDictionary, Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../items/models/item.interface";
import {getLifestylesComponentState} from "./lifestyles.selectors";


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
  on(LifestylesActions.createLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.createLifestylesSuccess, (state) => {
      return {...state}
    }
  ),
  on(LifestylesActions.createLifestylesFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.updateLifestyle, (state, {Lifestyle}) => {
      return {...state}
    }
  ),
  on(LifestylesActions.updateLifestyleTaxes, (state, {Taxes}) => {
      return {...state}
    }
  ),
  on(LifestylesActions.updateLifestyleItems, (state, {Item}) => {

    const lifestylesCopy = deepCopy(state.Lifestyles);

    lifestylesCopy[Item.LifestyleId].Items[Item.Id] =  Item;

    return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
  }),

  on(LifestylesActions.deleteLifestyleItem, (state, {Item}) => {

    const lifestylesCopy = deepCopy(state.Lifestyles);

    delete lifestylesCopy[Item.LifestyleId].Items[Item.Id];

    return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
  }),
  on(LifestylesActions.deleteLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.deleteLifestylesSuccess, (state, {Lifestyles}) => {
      const currentLifestyles = deepCopy(state.Lifestyles);
      const updatedLifestyles = Lifestyles.map(ls => delete currentLifestyles[ls.Id]);

      return {...state, updatedLifestyles}
    }
  ),
  on(LifestylesActions.deleteLifestylesFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.loadLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.loadLifestylesSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.loadLifestylesFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.loadExampleLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.loadExampleLifestylesSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.loadExampleLifestylesFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.loadLifestylesById, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.loadLifestylesByIdSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.loadLifestylesByIdFailure, (state, {error}) => {
      console.log(error);
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


export function withUpdatedValues<T>(original: T, newValue: Partial<T>) {
  return Object.assign({}, original, newValue);
}


