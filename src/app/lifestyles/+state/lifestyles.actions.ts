import {createAction, props} from '@ngrx/store';
import {Category} from "../../shared/categories/category.interface";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Item} from "../../items/models/item.interface";
import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";


export const updateLifestyle = createAction(
  '[Lifestyles] Update Lifestyle',
  props<{ Lifestyle: Lifestyle }>()
);
export const updateLifestyleTaxes = createAction(
  '[Lifestyles] Update Lifestyle Taxes',
  props<{ LifestyleId: string, Taxes: number[] }>()
);

export const updateLifestyleItems = createAction(
  '[Lifestyles] Update Lifestyle Items',
  props<{ Items: Item[] }>()
);

export const deleteLifestyleItem = createAction(
  '[Lifestyles] Delete Lifestyle Items',
  props<{ Item: Item }>()
);


export const saveLifestyleToDatabase = createAction(
  '[Lifestyles] Save Lifestyles to Database',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const saveLifestyleToDatabaseSuccess = createAction(
  '[Lifestyles] Save Lifestyles to Database Success',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const saveLifestyleToDatabaseFailure = createAction(
  '[Lifestyles] Save Lifestyles to Database Failure',
  props<{ error: any }>()
);


export const deleteLifestylesLocalAndDatabase = createAction(
  '[Lifestyles] Delete Lifestyles Local and Database',
  props<{ Lifestyles: Lifestyle[], onlyLocal: boolean }>()
);

export const deleteLifestylesLocalAndDatabaseSuccess = createAction(
  '[Lifestyles]  Delete Lifestyles Local and Database Success',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const deleteLifestylesLocalAndDatabaseFailure = createAction(
  '[Lifestyles]  Delete Lifestyles Local and Database Failure',
  props<{ error: any }>()
);

export const getLifestylesById = createAction(
  '[Lifestyles] Get Lifestyles by Id',
  props<{ ids: string[] }>()
);

export const getLifestylesByIdSuccess = createAction(
  '[Lifestyles]  Get Lifestyles by Id Success',
  props<{ Lifestyles: LifestylesDictionary }>()
);

export const getLifestylesByIdFailure = createAction(
  '[Lifestyles] Get Lifestyles by Id Failure',
  props<{ error: any }>()
);

export const getExampleLifestyles = createAction(
  '[Lifestyles] Get Example Lifestyles'
);

export const getExampleLifestylesSuccess = createAction(
  '[Lifestyles] Get Example Lifestyles Success',
  props<{ Lifestyles: LifestylesDictionary }>()
);

export const getExampleLifestylesFailure = createAction(
  '[Lifestyles] Get Example Lifestyles Failure',
  props<{ error: any }>()
);

export const getCategories = createAction(
  '[Lifestyles] Get Categories'
);

export const getCategoriesSuccess = createAction(
  '[Lifestyles] Get Categories Success',
  props<{ Categories: Category[] }>()
);

export const getCategoriesFailure = createAction(
  '[Lifestyles] Get Categories Failure',
  props<{ error: any }>()
);

export const getCategoryGroups = createAction(
  '[Lifestyles] Get Category Groups'
);

export const getCategoryGroupsSuccess = createAction(
  '[Lifestyles] Get Category Groups Success',
  props<{ CategoryGroups: CategoryGroups[] }>()
);

export const getCategoryGroupsFailure = createAction(
  '[Lifestyles] Get Category Groups Failure',
  props<{ error: any }>()
);


export const exportLifestyles = createAction(
  '[Lifestyles] Export Lifestyles',
  props<{ Lifestyles: Lifestyle[] }>()
);

export const exportLifestylesSuccess = createAction(
  '[Lifestyles] Export Lifestyles Success'

);

export const exportLifestylesFailure = createAction(
  '[Lifestyles] Export Lifestyles Failure',
  props<{ error: any }>()
);
