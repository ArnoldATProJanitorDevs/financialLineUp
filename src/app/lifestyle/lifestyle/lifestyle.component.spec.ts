import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LifestyleComponent} from './lifestyle.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {TaxratesModule} from '../../taxrates/taxrates.module';
import {SummaryModule} from '../../summary/summary.module';
import {ItemsModule} from '../../items/items.module';
import {LifestylesFacade} from '../../lifestyles/+state/lifestyles.facade';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {getExampleLifestyles} from '../../lifestyles/models/lifestyle-example';
import {Categories} from '../../shared/categories/categories';
import {mapCategoriesToGroups} from '../../shared/categories/category-groups.service';
import * as fromLifestyles from '../../lifestyles/+state/lifestyles.reducer';
import {ExportDialogComponent} from '../../shared/modalDialog/export-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import * as fromLifestylesSelectors from '../../lifestyles/+state/lifestyles.selectors';
import {MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';
import {ItemDictionary} from '../../items/models/itemDictionary.interface';
import {Category} from '../../shared/categories/category.interface';
import {CategoryGroups} from '../../shared/categories/category-groups.interface';
import {LifestylesDictionary} from '../../lifestyles/models/lifestylesDictionary.interface';
import * as LifestyleActions from '../../lifestyles/+state/lifestyles.actions';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import 'jest-extended';
import {Lifestyle} from '../models/lifestyle.interface';

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  let mockStore: MockStore<fromLifestyles.State>;
  let lifestyleSelector: MemoizedSelector<fromLifestyles.State, LifestylesDictionary>;
  let lifestyleByIdSelector: MemoizedSelectorWithProps<fromLifestyles.State, { id }, Lifestyle>;
  let categorySelector: MemoizedSelector<fromLifestyles.State, Category[]>;
  let categoryGroupSelector: MemoizedSelector<fromLifestyles.State, CategoryGroups[]>;
  let itemsOfLifestyleById: MemoizedSelectorWithProps<fromLifestyles.State, { id }, ItemDictionary>;

  let dispatchSpy;

  const initialLifestyleState = {
    Lifestyles: getExampleLifestyles(),
    Categories,
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
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);

    lifestyleSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllLifestyles,
      initialLifestyleState.Lifestyles
    );

    lifestyleByIdSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getLifestyleById,
      Object.values(initialLifestyleState.Lifestyles)[0]
    );

    itemsOfLifestyleById = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllItemsOfLifestyleById,
      Object.values(initialLifestyleState.Lifestyles)[0].Items
    );

    categorySelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategories,
      initialLifestyleState.Categories
    );

    categoryGroupSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategoryGroups,
      initialLifestyleState.CategoryGroups
    );

    fixture = TestBed.createComponent(LifestyleComponent);
    component = fixture.componentInstance;

    lifestyleSelector.setResult(getExampleLifestyles());
    lifestyleByIdSelector.setResult(Object.values(getExampleLifestyles())[0]);
    categorySelector.setResult(Categories);
    categoryGroupSelector.setResult(mapCategoriesToGroups());


    mockStore.refreshState();
    fixture.detectChanges();


  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shareLifestyles - should call action for store if sharing is available', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    component.sharingAvailable = true;
    (component as any).shareLifestyles(Object.values(initialLifestyleState.Lifestyles)[0]);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.saveLifestyleToDatabase({
        Lifestyles: [Object.values(initialLifestyleState.Lifestyles)[0]]
      }));
  });

  it('shareLifestyles - should open dialog because sharing isnt available', () => {
    const dialog = TestBed.inject(MatDialog);
    (component as any).shareLifestyles(initialLifestyleState.Lifestyles);
    expect(dialog.openDialogs).toHaveLength(1);
  });

  it('duplicateLifestyle - should call updateLifestyle-Action containing subset of given data', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    component.sharingAvailable = true;
    (component as any).duplicateLifestyle(Object.values(initialLifestyleState.Lifestyles)[0]);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyle({
        Lifestyle: expect.objectContaining({
          Name: 'COPY Alone',
          TaxRates: [42],
          Items: expect.any(Object)
        })
      }));
  });

  it('deleteLifeStyle - should call deleteLifestylesLocalAndDatabase-Action containing subset of given data', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    component.sharingAvailable = true;
    (component as any).deleteLifeStyle(Object.values(initialLifestyleState.Lifestyles)[0]);

    const expected = [Object.values(initialLifestyleState.Lifestyles)[0]];

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.deleteLifestylesLocalAndDatabase({
        Lifestyles: expect.arrayContaining(expected), onlyLocal: true
      }));
  });

  it('exportLifestyle - should call exportLifestyles-Action containing subset of given data', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    component.sharingAvailable = true;
    (component as any).exportLifestyle(Object.values(initialLifestyleState.Lifestyles)[0]);

    const expected = [Object.values(initialLifestyleState.Lifestyles)[0]];

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.exportLifestyles({
        Lifestyles: expect.arrayContaining(expected)
      }));
  });
});
