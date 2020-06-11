import { createAction, props } from '@ngrx/store';
import {LifestylesDictionary} from "./lifestyles.effects";

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
