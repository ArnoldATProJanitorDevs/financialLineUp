import { createAction, props } from '@ngrx/store';
import {LifestylesDictionary} from "./lifestyles.effects";
import {Category} from "../../item/models/category.interface";

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
