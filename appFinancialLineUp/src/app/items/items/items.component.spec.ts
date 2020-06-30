import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ItemsComponent} from './items.component';
import {v4 as uuidv4} from 'uuid';
import {ToggleIconButtonModule} from "../../toogle-icon-button/toggle-icon-button.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {Item} from "../models/item.interface";
import {Category} from "../models/category.interface";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ExampleLifestyles} from "../../lifestyles/models/lifestyle-example";
import * as fromLifestyles from '../../lifestyles/+state/lifestyles.reducer'
import * as fromLifestylesSelectors from '../../lifestyles/+state/lifestyles.selectors'
import * as fromLifestylesActions from '../../lifestyles/+state/lifestyles.actions'
import {MemoizedSelector, MemoizedSelectorWithProps} from "@ngrx/store";
import {Categories} from "../../shared/categories/categories";
import {ItemDictionary} from "../models/itemDictionary.interface";


describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockStore: MockStore<fromLifestyles.State>;
  let updateSelector: MemoizedSelectorWithProps<fromLifestyles.State, 'alone', ItemDictionary>;
  let categorySelector: MemoizedSelector<fromLifestyles.State, Category[]>;

  const item: ItemDictionary = {
    ['213']: {
      LifestyleId: 'alone',
      Id: '213',
      Cost: 20,
      Category: {name: 'housing', icon: 'home'},
      Comment: "Rent"
    }
  };

  let initialLifestyleState = {
    Lifestyles: ExampleLifestyles,
    Categories: Categories
  } as fromLifestyles.State;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [
        BrowserAnimationsModule,
        ToggleIconButtonModule,
        SharedModule,
        FormsModule],
      providers: [LifestylesFacade, provideMockStore({initialState: initialLifestyleState})]
    })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);


    updateSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllItemsOfLifestyleById,
      item
    );

    categorySelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategories,
      Categories
    );

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getItemById - should get an Item by the Id', () => {
    component = fixture.componentInstance;

    component.Items = [{
      LifestyleId: '12bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Cost: 0,
      Category: {
        icon: 'house',
        name: 'housing'
      },
      Comment: 'Mockup'
    }];

    const item = component.getItemById('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

    expect(item).toBeTruthy();
    expect(item.Id).toBe('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

  });

  it('getItemById - should return null for Item when no UUID or invalid Uuid is given', () => {
    component = fixture.componentInstance;

    const itemZeroUuid = component.getItemById('');

    expect(itemZeroUuid).toBeNull();

    const itemInvalidUuid = component.getItemById('invalidUuid');

    expect(itemInvalidUuid).toBeNull();

  });

  it('addItem - should add an Item to the List', () => {
    component = fixture.componentInstance;

    component.Items = [{
      LifestyleId: '12bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Cost: 0,
      Category: {
        icon: 'house',
        name: 'housing'
      },
      Comment: 'Mockup'
    }];

    const oldItemsList = component.Items;
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    const newItem: Item = {
      LifestyleId: 'mockupId',
      Category: {name: 'housing', icon: 'home'},
      Cost: 52, Id: uuidv4(),
      Comment: "Electricity"
    };
    component.addItem(newItem);
    const newItemsList = component.Items;

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(2);

  });

  it('deleteItem - should remove an Item from the List', async () => {
    expect(false).toBe(true)
  });


  it('deleteItem - should return original ItemsList when Item from the List gets removed, which is not inside', () => {
    component = fixture.componentInstance;

    const nonExistingItem: Item = {
      LifestyleId: 'mockupId',
      Category: {name: 'housing', icon: 'home'},
      Cost: 0,
      Id: uuidv4(),
      Comment: "noComment"
    };

    component.deleteItem(nonExistingItem);
    expect(component.Items).toBe(component.Items);

  });

  it('updateItemsInDataTable- should return the newly inserted list for Items', () => {
    component = fixture.componentInstance;

    const ItemList: Item[] = [
      {
        LifestyleId: 'mockupId',
        Id: '49efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 1,
        Category: {name: 'housing', icon: 'home'},

      },
      {
        LifestyleId: 'mockupId',
        Id: '50efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 2,
        Category: {name: 'housing', icon: 'home'},
      },
      {
        LifestyleId: 'mockupId',
        Id: '51efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 3,
        Category: {name: 'housing', icon: 'home'},
      }
    ];
    component.updateItemsInDataTable(ItemList);

    const dataTable = component.tableData;

    expect(dataTable.data.length).toBe(3);
    expect(dataTable.data[0]).toBe(ItemList[0]);
    expect(dataTable.data[1]).toBe(ItemList[1]);
    expect(dataTable.data[2]).toBe(ItemList[2]);

  });

  it('updateItemsInDataTable- should return change nothing when invalid or null data for newItems was given into', () => {
    component = fixture.componentInstance;

    const dataBeforeManipulation = component.tableData.data;
    const dataLength = dataBeforeManipulation.length;
    expect(dataBeforeManipulation.length).toBe(dataLength);


    const emptyItemList: Item[] = [];
    component.updateItemsInDataTable(emptyItemList);

    const dataAfterManipulation = component.tableData.data;
    expect(dataAfterManipulation.length).toBe(dataLength);

  });

  it('handleToggleButton - should return a category increased by 1', () => {
    expect(false).toBe(true)
  });

  it('handleToggleButton - should return the first category if increased by 1 runs out of bounds', () => {
    expect(false).toBe(true)
  });
});
