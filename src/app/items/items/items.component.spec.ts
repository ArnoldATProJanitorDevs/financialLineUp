import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {v4 as uuidv4} from 'uuid';
import {ToggleIconButtonModule} from "../../toogle-icon-button/toggle-icon-button.module";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {Item} from "../models/item.interface";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ExampleLifestyles} from "../../lifestyles/models/lifestyle-example";
import * as fromLifestyles from '../../lifestyles/+state/lifestyles.reducer'
import * as fromLifestylesSelectors from '../../lifestyles/+state/lifestyles.selectors'
import {MemoizedSelector, MemoizedSelectorWithProps, Store} from "@ngrx/store";
import {Categories} from "../../shared/categories/categories";
import {ItemDictionary} from "../models/itemDictionary.interface";
import {Category} from "../../shared/categories/category.interface";
import {ItemsComponent} from "./items.component";
import {mapCategoriesToGroups} from "../../shared/categories/category-groups.service";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";
import * as LifestyleActions from "../../lifestyles/+state/lifestyles.actions";
import "jest-extended";


describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockStore: MockStore<fromLifestyles.State>;
  let updateSelector: MemoizedSelectorWithProps<fromLifestyles.State, 'alone', ItemDictionary>;
  let categorySelector: MemoizedSelector<fromLifestyles.State, Category[]>;
  let categoryGroupSelector: MemoizedSelector<fromLifestyles.State, CategoryGroups[]>;
  let dispatchSpy;

  const item: ItemDictionary = {
    ['testItemId']: {
      LifestyleId: 'testLifestyleId',
      Id: 'testItemId',
      Cost: 20,
      Category: {name: 'housing', icon: 'home'},
      Comment: "Rent",
      Index: 0
    }
  };

  let initialLifestyleState = {
    Lifestyles: ExampleLifestyles,
    Categories: Categories,
    CategoryGroups: mapCategoriesToGroups(),
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
      initialLifestyleState.Categories
    );

    categoryGroupSelector = mockStore.overrideSelector(
      fromLifestylesSelectors.getAllCategoryGroups,
      initialLifestyleState.CategoryGroups
    );


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;

    component.setUpSubscriptions();
    updateSelector.setResult(item)
    categorySelector.setResult(Categories);
    categoryGroupSelector.setResult(mapCategoriesToGroups());
    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCategoryGroupsFromStore - component has same categorygroups as store', async () => {
    component = fixture.componentInstance;

    component.getCategoryGroupsFromStore();

    expect(component.CategoryGroups).toEqual(mapCategoriesToGroups());
  });

  it('getCategoriesFromStore - component has same categories as store', async () => {
    component = fixture.componentInstance;

    component.getCategoriesFromStore();

    expect(component.Categories).toEqual(Categories);
  });

  it('handleCategoryToggleButton - category of item should be toggled to +1', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToToggle: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    const resultItem: Item = {
      Category: {
        group: 0,
        name: 'rent',
        icon: 'house_siding',
      }, Comment: "mockup",
      Cost: 0,
      Id: 'testItemId',
      Index: 0,
      LifestyleId: 'testLifestyleId'
    };

    updateSelector.setResult(itemToToggle);
    mockStore.refreshState();
    fixture.detectChanges();

    component.handleCategoryToggleButton(itemToToggle['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyleItems({Items: [resultItem]})
    );


  });

  it('toggleToNextCategory - category of item should be toggled to +1', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToToggle: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    const resultItem: Item = {
      Category: {
        group: 0,
        name: 'rent',
        icon: 'house_siding',
      }, Comment: "mockup",
      Cost: 0,
      Id: 'testItemId',
      Index: 0,
      LifestyleId: 'testLifestyleId'
    };

    updateSelector.setResult(itemToToggle);
    mockStore.refreshState();
    fixture.detectChanges();

    (component as any).toggleToNextCategory(itemToToggle['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyleItems({Items: [resultItem]})
    );

  });

  it('toggleToNextCategory - no categories in component, no dispatched action', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToToggle: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    updateSelector.setResult(itemToToggle);
    categorySelector.setResult([]);
    mockStore.refreshState();
    fixture.detectChanges();

    component.getCategoriesFromStore();

    (component as any).toggleToNextCategory(itemToToggle['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(component.Categories).toHaveLength(0);
  });

  it('toggleToNextCategory - no items in component, no dispatched action', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToToggle: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    updateSelector.setResult({});
    mockStore.refreshState();
    fixture.detectChanges();

    (component as any).toggleToNextCategory(itemToToggle['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(component.Items).toStrictEqual([]);
  });

  it('getItemById - should get an Item by the Id', () => {
    component = fixture.componentInstance;

    component.Items = [{
      LifestyleId: '12bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Cost: 0,
      Category: {
        group: 0,
        icon: 'house',
        name: 'housing'
      },
      Comment: 'Mockup',
      Index: 0
    }];

    const item = component.getItemById('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

    expect(item).toBeTruthy();
    expect(item.Id).toEqual('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

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
      Comment: 'Mockup',
      Index: 0
    }];

    const oldItemsList = component.Items;
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    const newItem: Item = {
      LifestyleId: 'mockupId',
      Category: {name: 'housing', icon: 'home'},
      Cost: 52, Id: uuidv4(),
      Comment: "Electricity",
      Index: 0

    };
    (component as any).addItem(newItem);
    const newItemsList = component.Items;

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(2);

  });

  it('deleteItem - should call the corresponding action to delete item with item as payload', async () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToDelete: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    updateSelector.setResult(itemToDelete);
    mockStore.refreshState();
    fixture.detectChanges();

    (component as any).deleteItem(itemToDelete['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.deleteLifestyleItem({Item: itemToDelete['testItemId']})
    );

  });

  it('deleteItem - not existing Item should call the corresponding action to delete item with item as payload', () => {
    dispatchSpy = spyOn(mockStore, 'dispatch');

    const nonExistingItem: Item = {
      LifestyleId: 'mockupId',
      Category: {name: 'housing', icon: 'home'},
      Cost: 0,
      Id: uuidv4(),
      Comment: "noComment",
      Index: 0
    };

    (component as any).deleteItem(nonExistingItem);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);

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
        Index: 0
      },
      {
        LifestyleId: 'mockupId',
        Id: '50efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 2,
        Category: {name: 'housing', icon: 'home'},
        Index: 0
      },
      {
        LifestyleId: 'mockupId',
        Id: '51efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 3,
        Category: {name: 'housing', icon: 'home'},
        Index: 0
      }
    ];
    (component as any).updateItemsInDataTable(ItemList);

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
    (component as any).updateItemsInDataTable(emptyItemList);

    const dataAfterManipulation = component.tableData.data;
    expect(dataAfterManipulation.length).toBe(dataLength);

  });

  it('updateCategory - should dispatch the updateCategory once and with expected values', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToUpdateCategory: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    const itemWithUpdatedCategory: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'rent',
          icon: 'house_siding',
          group:0,
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    updateSelector.setResult(itemToUpdateCategory);
    mockStore.refreshState();
    fixture.detectChanges();

    const newCategory = component.Categories[1].name;

    (component as any).updateCategory(newCategory,itemToUpdateCategory['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      LifestyleActions.updateLifestyleItems({Items: Object.values(itemWithUpdatedCategory)})
    );
  });

  it('updateCategory - should dispatch the updateCategory none because of invalid categoryname provided', () => {

    dispatchSpy = spyOn(mockStore, 'dispatch');

    const itemToUpdateCategory: ItemDictionary = {
      ['testItemId']: {
        Category: {
          name: 'housing',
          icon: 'house',
        }, Comment: "mockup",
        Cost: 0,
        Id: 'testItemId',
        Index: 0,
        LifestyleId: 'testLifestyleId'
      }
    }

    updateSelector.setResult(itemToUpdateCategory);
    mockStore.refreshState();
    fixture.detectChanges();
    const invalidCategory = 'testMockup';

    (component as any).updateCategory(invalidCategory,itemToUpdateCategory['testItemId']);

    expect(dispatchSpy).toHaveBeenCalledTimes(0);

  });

  it('getCategoryByName - should return valid if a valid category was entered', () => {
    const validCategoryName = 'housing';

    const category = component.getCategoryByName(validCategoryName);

    expect(category).toBeTruthy();
    expect(category.name).toEqual(validCategoryName);

  });

  it('getCategoryByName - should return null if invalid category was entered', () => {
    const validCategoryName = 'notExistingCategory';

    const category = component.getCategoryByName(validCategoryName);

    expect(category).toBeFalsy();

  });

  it('getIndexOfCategory - should return index > -1 category if valid category was entered', () => {
    const indexOfCategory = component.getIndexOfCategory(component.Categories[0]);

    expect(indexOfCategory).toBeGreaterThan(-1);
  });

  it('getIndexOfCategory - should valid category if invalid category was entered', () => {
    const invalidCategory: Category = {
      name: 'housing',
      icon: 'house',
      group: 0
    };

    const indexOfCategory = component.getIndexOfCategory(invalidCategory);

    expect(indexOfCategory).toBe(-1);
  });

  it('orderByIndex - DESCRIBE NOW', () => {

    const Item1 : Item = {
      Category: undefined,
      Comment: "",
      Cost: 0,
      Id: undefined,
      Index: 0,
      LifestyleId: undefined
    };

    const Item2 : Item = {
      Category: undefined,
      Comment: "",
      Cost: 0,
      Id: undefined,
      Index: 1,
      LifestyleId: undefined
    };

    const comparison1 = (component as any).orderByIndex(Item1, Item2);
    const comparison2 = (component as any).orderByIndex(Item2, Item1);

    expect(comparison1).toBe(-1);
    expect(comparison2).toBe(1);

    Item2.Index = 0;

    const comparison3 = (component as any).orderByIndex(Item1, Item2);
    expect(comparison3).toBe(0);

  });

});
