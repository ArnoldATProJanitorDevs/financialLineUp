import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {v4 as uuidv4} from 'uuid';

import {LifestyleComponent} from './lifestyle.component';
import {Item} from "../../item/models/item.interface";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {Category} from "../../item/models/category.interface";

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleComponent);
    component = fixture.componentInstance;
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

  it('should have a every property GT than 0, taxes GTE 0', () => {
    component = fixture.componentInstance;
    const Lifestyle = component.Lifestyle;
    expect(Lifestyle.Items.length).toBeGreaterThan(0);
    expect(Lifestyle.Description.length).toBeGreaterThan(0);
    expect(Lifestyle.Id).toBeTruthy();
    expect(Lifestyle.Name.length).toBeGreaterThan(0);
    expect(Lifestyle.TaxRates.length).toBeGreaterThanOrEqual(0);
  });

  it('calculateTotal - should calculate total of all numbers', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }
    const sum = component.calculateTotal(numbers);
    expect(sum).toBe(45);
  });

  it('calculatePercentage - should calculate total of all numbers after taxes', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900  ];
    let taxrateInteger = 50;

    for (let i = 0; i < numbers.length; i++) {
      const sum = component.calculatePercentage(numbers[i], taxrateInteger);
      expect(sum).toBeCloseTo(numbers[i]*2,1);
    }

  });

  it('getItemById - should get an Item by the Id', () => {
    component = fixture.componentInstance;

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

    const oldItemsList = component.getItems();
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    const newItem: Item = {
      Category: {name: 'housing', icon: 'home'},
      Cost: 52, Id: uuidv4(),
      Comment: "Electricity"
    };
    component.addItem(newItem);
    const newItemsList = component.getItems();

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(2);

  });

  it('removeItem - should remove an Item from the List', () => {
    component = fixture.componentInstance;

    const oldItemsList = component.getItems();
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    component.removeItem(oldItemsList[0]);

    const newItemsList = component.getItems();

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(0);

  });

  it('removeItem - should return original ItemsList when Item from the List gets removed, which is not inside', () => {
    component = fixture.componentInstance;

    const nonExistingItem: Item = {
      Category: {name: 'housing', icon: 'home'},
      Cost: 0,
      Id: uuidv4(),
      Comment: "noComment"
    };

    const returnedValue = component.removeItem(nonExistingItem);
    expect(returnedValue).toBe(component.Lifestyle.Items);

  });

  it('updateItemById - should update an Item from the List by Id', () => {
    component = fixture.componentInstance;

    const currItem = {...component.getItems()[0]};
    expect(currItem).toBeTruthy();
    expect(currItem.Comment).toBe('Groceries');

    currItem.Comment = 'differentCommentThanBefore';
    expect(currItem.Comment).toBe('differentCommentThanBefore');

    component.updateItemById(currItem.Id, currItem);

    const updatedItem = component.getItemById(currItem.Id);


    expect(updatedItem).toBeTruthy();
    expect(updatedItem.Comment).toBe('differentCommentThanBefore');

  });
  it('updateItemById - should NOT update an Item from the List by Id when invalid Uuid or null is given', () => {
    component = fixture.componentInstance;

    const currItem = {...component.getItems()[0]};
    expect(currItem).toBeTruthy();
    expect(currItem.Comment).toBe('Groceries');

    currItem.Comment = 'differentCommentThanBefore';
    expect(currItem.Comment).toBe('differentCommentThanBefore');

    component.updateItemById(null, currItem);

    const hopefullyNotUpdatedItemNull = component.getItemById(currItem.Id);
    expect(hopefullyNotUpdatedItemNull.Comment).toBe('Groceries');

    component.updateItemById('invalidUuid', currItem);

    const hopefullyNotUpdatedItemInvalidUuid = component.getItemById(currItem.Id);
    expect(hopefullyNotUpdatedItemInvalidUuid.Comment).toBe('Groceries');

  });

  it('clearItems - should delete all Items in Lifestyle', () => {
    component = fixture.componentInstance;

    let itemList = component.getItems();

    expect(itemList).toBeTruthy();
    expect(itemList.length).toBeGreaterThan(0);

    const successfulDelete = component.clearItems();

    expect(successfulDelete).toBeTruthy();

    itemList = component.getItems();

    expect(itemList).toBeTruthy();
    expect(itemList.length).toBe(0);

  });

  it('updateItemsInDataTable- should return the newly inserted list for Items', () => {
    component = fixture.componentInstance;

    const ItemList: Item[] = [
      {
        Id: '49efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 1,
        Category: {name: 'housing', icon: 'home'},

      },
      {
        Id: '50efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 2,
        Category: {name: 'housing', icon: 'home'},
      },
      {
        Id: '51efab45-0005-4d50-8c45-88225eedf70c',
        Comment: 'noComment',
        Cost: 3,
        Category: {name: 'housing', icon: 'home'},
      }
    ];
    component.updateItemsInDataTable(ItemList);

    const dataTable = component.dataSource;

    expect(dataTable.data.length).toBe(3);
    expect(dataTable.data[0]).toBe(ItemList[0]);
    expect(dataTable.data[1]).toBe(ItemList[1]);
    expect(dataTable.data[2]).toBe(ItemList[2]);

  });

  it('updateItemsInDataTable- should return change nothing when invalid or null data for newItems was given into', () => {
    component = fixture.componentInstance;

    const dataBeforeManipulation = component.dataSource.data;
    const dataLength = dataBeforeManipulation.length;
    expect(dataBeforeManipulation.length).toBe(dataLength);


    const emptyItemList: Item[] = [];
    component.updateItemsInDataTable(emptyItemList);

    const dataAfterManipulation = component.dataSource.data;
    expect(dataAfterManipulation.length).toBe(dataLength);

  });

  it('toggleBetweenCategories - should return a category increased by 1', () => {

    const CategoryMockup: Category[] = [{
      name: 'test1',
      icon: 'test1'
    },
      {
        name: 'test2',
        icon: 'test2'
      }
    ];

    component.Categories = CategoryMockup;

    component = fixture.componentInstance;

    component.Lifestyle.Items[0].Category = CategoryMockup[0];
    const indexOfCategoryBeforeIncrease = CategoryMockup.indexOf(component.Lifestyle.Items[0].Category);

    component.toggleBetweenCategories(CategoryMockup[0], component.Lifestyle.Items[0]);

    const indexOfCategoryAfterIncrease = CategoryMockup.indexOf(component.Lifestyle.Items[0].Category);

    expect(indexOfCategoryBeforeIncrease).toBe(0);
    expect(indexOfCategoryAfterIncrease).toBe(1);


  });

  it('toggleBetweenCategories - should return the first category if increased by 1 runs out of bounds', () => {
    component = fixture.componentInstance;

    const CategoryMockup: Category[] = [{
      name: 'test1',
      icon: 'test1'
    },
      {
        name: 'test2',
        icon: 'test2'
      }
    ];

    component.Categories = CategoryMockup;

    component.Lifestyle.Items[0].Category =  CategoryMockup[1];
    const indexOfCategoryBeforeIncrease = CategoryMockup.indexOf(component.Lifestyle.Items[0].Category);

    component.toggleBetweenCategories(CategoryMockup[1], component.Lifestyle.Items[0]);

    const indexOfCategoryAfterIncrease = CategoryMockup.indexOf(component.Lifestyle.Items[0].Category);

    expect(indexOfCategoryBeforeIncrease).toBe(CategoryMockup.length - 1);
    expect(indexOfCategoryAfterIncrease).toBe(0);


  });

});
