import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {v4 as uuidv4} from 'uuid';


import {LifestyleComponent} from './lifestyle.component';
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.enum";

describe('LifestyleComponent', () => {
  let component: LifestyleComponent;
  let fixture: ComponentFixture<LifestyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleComponent]
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

  it('should calculate total of all numbers', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    for (let i = 0; i < 10; i++) {
      numbers.push(i);
    }
    const sum = component.calculateTotal(numbers);
    expect(sum).toBe(45);
  });

  it('should calculate total of all numbers after taxes', () => {
    component = fixture.componentInstance;

    let numbers: number[] = [];
    let taxrateInteger = 40;
    const results = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600];


    for (let i = 1; i <= 10; i++) {
      numbers.push(i * 100);
    }


    for (let i = 0; i < 10; i++) {
      const sum = component.calculateAfterTaxes(numbers[i], taxrateInteger);
      expect(sum).toBe(results[i]);
    }

  });

  it('should get an Item by the Id', () => {
    component = fixture.componentInstance;

    const item = component.getItemById('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

    expect(item).toBeTruthy();
    expect(item.Id).toBe('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');

  });

  it('should add an Item to the List', () => {
    component = fixture.componentInstance;

    const oldItemsList = component.getItems();
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    const newItem: Item = {
      Category: Category.electricity,
      CategoryIcon: Category.electricity,
      Cost: 52, Id: uuidv4(),
      Tag: "Electricity"
    };
    component.addItem(newItem);
    const newItemsList = component.getItems();

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(2);

  });

  it('should remove an Item from the List', () => {
    component = fixture.componentInstance;

    const oldItemsList = component.getItems();
    expect(oldItemsList).toBeTruthy();
    expect(oldItemsList.length).toBeGreaterThan(0);

    component.removeItem(oldItemsList[0]);

    const newItemsList = component.getItems();

    expect(newItemsList).toBeTruthy();
    expect(newItemsList.length).toBe(0);

  });

  it('should update an Item from the List by Id', () => {
    component = fixture.componentInstance;

    const currItem = {...component.getItems()[0]};
    expect(currItem).toBeTruthy();
    expect(currItem.Tag).toBe('Groceries');

    currItem.Tag = 'differentTagThanBefore';
    expect(currItem.Tag).toBe('differentTagThanBefore');

    component.updateItemById(currItem.Id, currItem);

    const updatedItem = component.getItemById(currItem.Id);


    expect(updatedItem).toBeTruthy();
    expect(updatedItem.Tag).toBe('differentTagThanBefore');

  });

  it('should delete all Items in Lifestyle', () => {
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
});
