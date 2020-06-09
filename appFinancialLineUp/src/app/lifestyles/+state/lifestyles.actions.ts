import { createAction, props } from '@ngrx/store';

export const loadLifestyles = createAction(
  '[Lifestyles] Load Lifestyles'
);

export const loadLifestylesSuccess = createAction(
  '[Lifestyles] Load Lifestyles Success',
  props<{ lifestyles: any }>()
);

export const loadLifestylesFailure = createAction(
  '[Lifestyles] Load Lifestyles Failure',
  props<{ error: any }>()
);
