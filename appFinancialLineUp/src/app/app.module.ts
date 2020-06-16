import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import * as fromAppComponent from './+state/app-component.reducer';
import * as fromRouteComponent from './+state/app-router.reducer';
import {AppComponentEffects} from './+state/app-component.effects';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {AppRouterEffects} from "./+state/app-router.effect";
import {LifestylesModule} from "./lifestyles/lifestyles.module";
import {AppRouterFacade} from "./+state/app-router.facade";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppComponentEffects, AppRouterEffects]),
    StoreModule.forRoot({
        router: routerReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }),
    StoreModule.forFeature(
      fromAppComponent.APPCOMPONENT_FEATURE_KEY,
      fromAppComponent.reducer
    ),
    StoreModule.forFeature(
      fromRouteComponent.ROUTECOMPONENT_FEATURE_KEY,
      fromRouteComponent.routeReducer
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    LifestylesModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [AppRouterFacade],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
