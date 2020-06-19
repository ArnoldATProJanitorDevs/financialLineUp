import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LifestylesComponent} from './lifestyles/lifestyles.component';
import {StoreModule} from '@ngrx/store';
import * as fromLifestyles from './+state/lifestyles.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LifestylesEffects} from './+state/lifestyles.effects';
import {LifestylesFacade} from "./+state/lifestyles.facade";
import {LifestyleModule} from "../lifestyle/lifestyle.module";
import {SharedModule} from "../shared/shared.module";
import {DataBaseConnectModule} from "../shared/data-base-connect/data-base-connect.module";

@NgModule({
  declarations: [LifestylesComponent],
  exports: [
    LifestylesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLifestyles.LIFESTYLE_FEATURE_KEY, fromLifestyles.reducer, {metaReducers: fromLifestyles.metaReducers}),
    EffectsModule.forFeature([LifestylesEffects]),
    LifestyleModule,
    SharedModule,
  ],
  providers: [LifestylesFacade],
})
export class LifestylesModule {
}
