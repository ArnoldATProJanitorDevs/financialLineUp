import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LifestylesComponent} from './lifestyles/lifestyles.component';
import {StoreModule} from '@ngrx/store';
import * as fromLifestyles from './+state/lifestyles.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LifestylesEffects} from './+state/lifestyles.effects';
import {LifestylesFacade} from "./+state/lifestyles.facade";
import {LifestyleModule} from "../lifestyle/lifestyle.module";
import {MapToArray} from "./lifestyles/map-to-array.pipe";


@NgModule({
  declarations: [LifestylesComponent],
  exports: [
    LifestylesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLifestyles.LIFESTYLE_FEATURE_KEY, fromLifestyles.reducer, {metaReducers: fromLifestyles.metaReducers}),
    EffectsModule.forFeature([LifestylesEffects]),
    LifestyleModule
  ],
  providers: [LifestylesFacade],
})
export class LifestylesModule {
}
