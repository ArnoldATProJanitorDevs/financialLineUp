import { createAction, props } from '@ngrx/store';

export const loadAppComponent = createAction(
  '[AppComponent] Load AppComponent'
);

export const loadAppComponentSuccess = createAction(
  '[AppComponent] Load AppComponent Success',
  props<{ appComponent: {} }>()
);

export const loadAppComponentFailure = createAction(
  '[AppComponent] Load AppComponent Failure',
  props<{ error: any }>()
);

