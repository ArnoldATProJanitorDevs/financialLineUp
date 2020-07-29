import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import * as fromAppComponent from './+state/app-component.reducer';
import {LifestylesModule} from './lifestyles/lifestyles.module';
import {Actions, EffectsModule} from '@ngrx/effects';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ExportDialogComponent} from './shared/modalDialog/export-dialog.component';
import {SharedModule} from './shared/shared.module';
import {NavbarModule} from './navbar/navbar.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {LifestyleDatabaseApiService} from './shared/data-base-connect/lifestyle-database-api.service';
import {LegislationFooterComponent} from './shared/legislation-footer/legislation-footer.component';
import {AppRouterFacade} from './+state/app-router.facade';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const FirestoreStub = {};
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          fromAppComponent.APPCOMPONENT_FEATURE_KEY,
          fromAppComponent.reducer
        ),
        EffectsModule.forRoot(),
        LifestylesModule,
        SharedModule,
        NavbarModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        Actions,
        LifestyleDatabaseApiService,
        {provide: AngularFirestore, useValue: FirestoreStub},
        LegislationFooterComponent,
        AppRouterFacade,
        ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
