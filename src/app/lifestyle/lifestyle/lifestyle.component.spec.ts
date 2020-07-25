import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestyleComponent} from './lifestyle.component';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {TaxratesModule} from "../../taxrates/taxrates.module";
import {SummaryModule} from "../../summary/summary.module";
import {ItemsModule} from "../../items/items.module";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ExampleLifestyles, getExampleLifestyles} from "../../lifestyles/models/lifestyle-example";
import {Categories} from "../../shared/categories/categories";
import {mapCategoriesToGroups} from "../../shared/categories/category-groups.service";
import * as fromLifestyles from "../../lifestyles/+state/lifestyles.reducer";
import {ExportDialogComponent} from "../../shared/modalDialog/export-dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import * as fromLifestylesSelectors from "../../lifestyles/+state/lifestyles.selectors";
import {MemoizedSelector, MemoizedSelectorWithProps} from "@ngrx/store";
import {ItemDictionary} from "../../items/models/itemDictionary.interface";
import {Category} from "../../shared/categories/category.interface";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";
import {LifestylesDictionary} from "../../lifestyles/models/lifestylesDictionary.interface";
import {SummaryComponent} from "../../summary/summary/summary.component";
import {Summary} from "@angular/compiler";

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  let mockStore: MockStore<fromLifestyles.State>;
  let lifestyleSelector: MemoizedSelector<fromLifestyles.State, LifestylesDictionary>;
  let categorySelector: MemoizedSelector<fromLifestyles.State, Category[]>;
  let categoryGroupSelector: MemoizedSelector<fromLifestyles.State, CategoryGroups[]>;

  let dispatchSpy;

  let initialLifestyleState = {
    Lifestyles: getExampleLifestyles(),
    Categories: Categories,
    CategoryGroups: mapCategoriesToGroups(),
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        TaxratesModule,
        SummaryModule,
        ItemsModule,
        MatDialogModule,
      ],
      providers: [MatDialog, LifestylesFacade, provideMockStore({initialState: initialLifestyleState})]
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



  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleComponent);
    component = fixture.componentInstance;

    lifestyleSelector.setResult(getExampleLifestyles())
    categorySelector.setResult(Categories);
    categoryGroupSelector.setResult(mapCategoriesToGroups());

    mockStore.refreshState();
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a LifeStyle', () => {
    component = fixture.componentInstance;
    const Lifestyle = component.Lifestyle;
    expect(Lifestyle).toBeTruthy();
  });

  it('should have a every property GT 0, taxes GTE 0', () => {
    component = fixture.componentInstance;
    const Lifestyle = component.Lifestyle;
    expect(Lifestyle.Items.length).toBeGreaterThan(0);
    expect(Lifestyle.Description.length).toBeGreaterThan(0);
    expect(Lifestyle.Id).toBeTruthy();
    expect(Lifestyle.Name.length).toBeGreaterThan(0);
    expect(Lifestyle.TaxRates.length).toBeGreaterThanOrEqual(0);
  });


  it('handleDialogReturn - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('handleDialogReturn - passing in null', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    (component as any).handleDialogReturn(null);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);

  });

  it('shareLifestyles - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('duplicateLifestyle - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('deleteLifeStyle - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });

  it('exportLifestyle - DESCRIBE NOW', () => {
    expect(false).toBeTruthy();
  });


});
