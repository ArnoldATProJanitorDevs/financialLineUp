import {createAction, props} from '@ngrx/store';
import {LifestylesDictionary} from "./lifestyles.effects";
import {Category} from "../../items/models/category.interface";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../items/models/item.interface";


export const updateLifestyle = createAction(
  '[Lifestyles] Update Lifestyle',
  props<{ Lifestyle: Lifestyle}>()
);
export const updateLifestyleTaxes = createAction(
  '[Lifestyles] Update Lifestyle Taxes',
  props<{ Taxes: number[]}>()
);

export const updateLifestyleItems = createAction(
  '[Lifestyles] Update Lifestyle Items',
  props<{ Items: Item[]}>()
);


export const deleteLifestyleItem = createAction(
  '[Lifestyles] Delete Lifestyle Items',
  props<{ Item: Item}>()
);




export const createLifestyles = createAction(
  '[Lifestyles] Create Lifestyles',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const createLifestylesSuccess = createAction(
  '[Lifestyles] Create Lifestyles Success',
);

export const createLifestylesFailure = createAction(
  '[Lifestyles] Create Lifestyles Failure',
  props<{ error: any }>()
);



export const deleteLifestyles = createAction(
  '[Lifestyles] Delete Lifestyles',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const deleteLifestylesSuccess = createAction(
  '[Lifestyles] Delete Lifestyles Success',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const deleteLifestylesFailure = createAction(
  '[Lifestyles] Delete Lifestyles Failure',
  props<{ error: any }>()
);


export const loadLifestyles = createAction(
  '[Lifestyles] Load Lifestyles'
);

export const loadLifestylesSuccess = createAction(
  '[Lifestyles] Load Lifestyles Success',
  props<{ Lifestyles: LifestylesDictionary }>()
);

export const loadLifestylesFailure = createAction(
  '[Lifestyles] Load Lifestyles Failure',
  props<{ error: any }>()
);


export const loadLifestylesById = createAction(
  '[Lifestyles] Load Lifestyles by Id',
  props<{ ids: string[] }>()
);

export const loadLifestylesByIdSuccess = createAction(
  '[Lifestyles]  Load Lifestyles by Id Success',
  props<{ Lifestyles: LifestylesDictionary }>()
);

export const loadLifestylesByIdFailure = createAction(
  '[Lifestyles] Load Lifestyles by Id Failure',
  props<{ error: any }>()
);

export const loadExampleLifestyles = createAction(
  '[Lifestyles] Load Example Lifestyles'
);

export const loadExampleLifestylesSuccess = createAction(
  '[Lifestyles] Load Example Lifestyles Success',
  props<{ Lifestyles: LifestylesDictionary }>()
);

export const loadExampleLifestylesFailure = createAction(
  '[Lifestyles] Load Example Lifestyles Failure',
  props<{ error: any }>()
);

export const loadCategories = createAction(
  '[Lifestyles] Load Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Lifestyles] Load Categories Success',
  props<{ Categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Lifestyles] Load Categories Failure',
  props<{ error: any }>()
);

