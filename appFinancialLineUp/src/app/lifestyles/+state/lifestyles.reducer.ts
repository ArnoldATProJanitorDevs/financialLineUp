import {
  Action,
  createReducer,
  MetaReducer, on,
} from '@ngrx/store';
import {environment} from "../../../environments/environment.prod";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {LifeStylesEntity} from "./lifestyles.model";
import * as LifestylesActions from './lifestyles.actions'
import {Category} from "../../shared/categories/category.interface";
import {deepCopy} from "../../shared/globals/deep-copy";
import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";


export const LIFESTYLE_FEATURE_KEY = 'lifestyles';

export interface State extends EntityState<LifeStylesEntity> {
  Lifestyles: LifestylesDictionary;
  CategoryGroups: CategoryGroups[];
  Categories: Category[];
}

export interface LifestylesPartialState {
  readonly [LIFESTYLE_FEATURE_KEY]: State;
}

export const lifestylesComponentAdapter: EntityAdapter<LifeStylesEntity> = createEntityAdapter<LifeStylesEntity>();

export const initialState: State = lifestylesComponentAdapter.getInitialState({
  Lifestyles: {},
  CategoryGroups: [],
  Categories: [],
});

const lifeStyleReducer = createReducer(
  initialState,
  on(LifestylesActions.saveLifestyleToDatabase, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.saveLifestyleToDatabaseSuccess, (state, {Lifestyles}) => {
      const lifestylesCopy = Object.assign({}, state.Lifestyles);

      Lifestyles.map(lifestyle =>
        lifestylesCopy[lifestyle.Id] = lifestyle
      );

      return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
    }
  ),
  on(LifestylesActions.saveLifestyleToDatabaseFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.updateLifestyle, (state, {Lifestyle}) => {
      const lifestylesCopy = Object.assign({}, state.Lifestyles);
      lifestylesCopy[Lifestyle.Id] = Lifestyle;


      return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
    }
  ),
  on(LifestylesActions.updateLifestyleTaxes, (state, {LifestyleId, Taxes}) => {

      const lifestylesCopy = deepCopy(state.Lifestyles);
      lifestylesCopy[LifestyleId].TaxRates = Taxes;


      return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
    }
  ),
  on(LifestylesActions.updateLifestyleItems, (state, {Items}) => {

    const lifestylesCopy = deepCopy(state.Lifestyles);

    Items.forEach(Item =>
      lifestylesCopy[Item.LifestyleId].Items[Item.Id] = Item
    );

    return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
  }),

  on(LifestylesActions.deleteLifestyleItem, (state, {Item}) => {

    const lifestylesCopy = deepCopy(state.Lifestyles);

    delete lifestylesCopy[Item.LifestyleId].Items[Item.Id];

    return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
  }),
  on(LifestylesActions.deleteLifestylesLocalAndDatabase, (state, {Lifestyles}) => {
      return {...state}
    }
  ),
  on(LifestylesActions.deleteLifestylesLocalAndDatabaseSuccess, (state, {Lifestyles}) => {
      const lifestylesCopy = deepCopy(state.Lifestyles);

      Object.values(Lifestyles).map(lifestyle =>
        delete lifestylesCopy[lifestyle.Id]
      );

      return withUpdatedValues(state, {Lifestyles: lifestylesCopy});
    }
  ),
  on(LifestylesActions.deleteLifestylesLocalAndDatabaseFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.getExampleLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.getExampleLifestylesSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.getExampleLifestylesFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.getLifestylesById, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.getLifestylesByIdSuccess, (state, {Lifestyles}) => {
      return {...state, Lifestyles}
    }
  ),
  on(LifestylesActions.getLifestylesByIdFailure, (state, {error}) => {
      console.log(error);
      return {...state, error}
    }
  ),
  on(LifestylesActions.getCategories, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.getCategoriesSuccess, (state, {Categories}) => {
      return {...state, Categories}
    }
  ),
  on(LifestylesActions.getCategoriesFailure, (state, {error}) => {
      return {...state, error}
    }
  ),

  on(LifestylesActions.getCategoryGroups, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.getCategoryGroupsSuccess, (state, {CategoryGroups}) => {
      return {...state, CategoryGroups}
    }
  ),
  on(LifestylesActions.getCategoryGroupsFailure, (state, {error}) => {
      return {...state, error}
    }
  ),


  on(LifestylesActions.exportLifestyles, (state, action) => {
      return {...state}
    }
  ),
  on(LifestylesActions.exportLifestylesSuccess, (state) => {
      return {...state}
    }
  ),
  on(LifestylesActions.exportLifestylesFailure, (state, {error}) => {
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


