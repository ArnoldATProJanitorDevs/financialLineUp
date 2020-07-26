import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestylesComponent} from './lifestyles.component';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {MemoizedSelector, MemoizedSelectorWithProps, StoreModule} from "@ngrx/store";
import * as fromLifestyles from "../+state/lifestyles.reducer";
import {Actions, EffectsModule} from "@ngrx/effects";
import {LifestylesEffects} from "../+state/lifestyles.effects";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";
import {SummaryComponent} from "../../summary/summary/summary.component";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireModule} from "@angular/fire";
import {ItemsComponent} from "../../items/items/items.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ItemDictionary} from "../../items/models/itemDictionary.interface";
import {Category} from "../../shared/categories/category.interface";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";
import {ExampleLifestyles, getExampleLifestyles} from "../models/lifestyle-example";
import {Categories} from "../../shared/categories/categories";
import {mapCategoriesToGroups} from "../../shared/categories/category-groups.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToggleIconButtonModule} from "../../toogle-icon-button/toggle-icon-button.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import * as fromLifestylesSelectors from "../+state/lifestyles.selectors";
import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {LifestyleComparingService} from "../../shared/services/lifestyle-comparing.service";
import {BehaviorSubject} from "rxjs";
import * as LifestyleActions from "../+state/lifestyles.actions";
import "jest-extended"

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

  let initialLifestyleState = {
    Lifestyles: ExampleLifestyles,
    Categories: Categories,
    CategoryGroups: mapCategoriesToGroups(),
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [LifestylesComponent],
      imports: [
        BrowserAnimationsModule,
        ToggleIconButtonModule,
        SharedModule,
        MatDialogModule,
        FormsModule],
      providers: [LifestylesFacade,
        provideMockStore({initialState: initialLifestyleState}),
        LifestyleComparingService, LifestyleDatabaseApiService,
        {provide: AngularFirestore, useValue: FirestoreStub},
      ]
    })
      .compileComponents();

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

    lifestyleSelector.setResult(initialLifestyleState.Lifestyles)
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

  it('addNewLifestyle - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('exportLifestyles - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  //TODO: implement function and test
  it('importLifestyles - DESCRIBE NOW', () => {
    expect(true).toBeTruthy();
  });

  it('shareLifestyles - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('openDialog - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('handleDialogReturn - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('setUpSubscriptions - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('compareLocalLifestylesWithBackend - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });
});
