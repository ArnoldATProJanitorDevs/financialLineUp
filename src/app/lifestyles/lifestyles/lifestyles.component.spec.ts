import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestylesComponent} from './lifestyles.component';
import {LifestylesFacade} from '../+state/lifestyles.facade';
import {MemoizedSelector, MemoizedSelectorWithProps, StoreModule} from '@ngrx/store';
import * as fromLifestyles from '../+state/lifestyles.reducer';
import {Actions, EffectsModule} from '@ngrx/effects';
import {LifestylesEffects} from '../+state/lifestyles.effects';
import {LifestyleDatabaseApiService} from '../../shared/data-base-connect/lifestyle-database-api.service';
import {SummaryComponent} from '../../summary/summary/summary.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ItemDictionary} from '../../items/models/itemDictionary.interface';
import {Category} from '../../shared/categories/category.interface';
import {CategoryGroups} from '../../shared/categories/category-groups.interface';
import {ExampleLifestyles, getExampleLifestyles} from '../models/lifestyle-example';
import {Categories} from '../../shared/categories/categories';
import {mapCategoriesToGroups} from '../../shared/categories/category-groups.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToggleIconButtonModule} from '../../toogle-icon-button/toggle-icon-button.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import * as fromLifestylesSelectors from '../+state/lifestyles.selectors';
import {LifestylesDictionary} from '../models/lifestylesDictionary.interface';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {LifestyleComparingService} from '../../shared/services/lifestyle-comparing.service';
import {BehaviorSubject, of} from 'rxjs';
import * as LifestyleActions from '../+state/lifestyles.actions';
import 'jest-extended';
import {ExportDialogComponent, ExportDialogReturn} from '../../shared/modalDialog/export-dialog.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import 'jest-extended'

const FirestoreStub = {
  collection: (name: string) => ({
    valueChanges: () => new BehaviorSubject(Object.values(getExampleLifestyles())),
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject(Object.values(getExampleLifestyles())[0]),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('LifestylesComponent', () => {
  let component: LifestylesComponent;
  let fixture: ComponentFixture<LifestylesComponent>;
  let mockStore: MockStore<fromLifestyles.State>;
  let lifestyleSelector: MemoizedSelector<fromLifestyles.State, LifestylesDictionary>;
  let categorySelector: MemoizedSelector<fromLifestyles.State, Category[]>;
  let categoryGroupSelector: MemoizedSelector<fromLifestyles.State, CategoryGroups[]>;
  let dispatchSpy;

  const initialLifestyleState = {
    Lifestyles: ExampleLifestyles,
    Categories,
    CategoryGroups: mapCategoriesToGroups(),
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [LifestylesComponent, ExportDialogComponent],
      imports: [
        BrowserAnimationsModule,
        ToggleIconButtonModule,
        MatDialogModule,
        FormsModule,
      ],
      providers: [LifestylesFacade,
        provideMockStore({initialState: initialLifestyleState}),
        LifestyleComparingService,
        LifestyleDatabaseApiService,
        {provide: AngularFirestore, useValue: FirestoreStub},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ExportDialogComponent],
      }
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);


    lifestyleSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllLifestyles,
      initialLifestyleState.Lifestyles
    );

    categorySelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategories,
      initialLifestyleState.Categories
    );

    categoryGroupSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategoryGroups,
      initialLifestyleState.CategoryGroups
    );

    fixture = TestBed.createComponent(LifestylesComponent);
    component = fixture.componentInstance;

    (component as any).setUpSubscriptions();

    lifestyleSelector.setResult(initialLifestyleState.Lifestyles);
    categorySelector.setResult(initialLifestyleState.Categories);
    categoryGroupSelector.setResult(initialLifestyleState.CategoryGroups);

    mockStore.refreshState();
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('HandleAddNewLifestyleButton - should dispatch one action and the payload should contain predefined', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');
    component.HandleAddNewLifestyleButton();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyle({
        Lifestyle: expect.objectContaining({
          Id: expect.any(String),
          Name: 'NEW LIFESTYLE',
          TaxRates: [40],
          Description: 'NEW DESCRIPTION',
          Items: expect.any(Object)
        })
      }));
  });

  it('addNewLifestyle - shall call updateLifestyles-Action once with defined payload', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');
    (component as any).addNewLifestyle();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyle({
        Lifestyle: expect.objectContaining({
          Id: expect.any(String),
          Name: 'NEW LIFESTYLE',
          TaxRates: [40],
          Description: 'NEW DESCRIPTION',
          Items: expect.any(Object)
        })
      }));
  });

  it('exportLifestyles - shall call exportLifestyles-Action once with defined payload', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    (component as any).exportLifestyles(initialLifestyleState.Lifestyles);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.exportLifestyles({
        Lifestyles: Object.values(initialLifestyleState.Lifestyles)
      }));
  });

  it('importLifestyles - MISSING', () => {
    // TODO: implement function and test afterwards
  });


  it('shareLifestyles - should call action for store if sharing is available', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    component.sharingAvailable = true;
    (component as any).shareLifestyles(initialLifestyleState.Lifestyles);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.saveLifestyleToDatabase({
        Lifestyles: Object.values(initialLifestyleState.Lifestyles)
      }));
  });

  it('shareLifestyles - should open dialog because sharing isnt available', () => {
    const dialog = TestBed.inject(MatDialog);
    (component as any).shareLifestyles(initialLifestyleState.Lifestyles);
    expect(dialog.openDialogs).toHaveLength(1);

   });

  it('openDialog - it should open a dialog', () => {
    const dialog = TestBed.inject(MatDialog);
    (component as any).openDialog();
    expect(dialog.openDialogs).toHaveLength(1);
  });
});
