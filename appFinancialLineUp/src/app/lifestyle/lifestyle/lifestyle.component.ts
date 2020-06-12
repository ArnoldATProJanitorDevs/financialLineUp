import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.enum";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {deepCopy} from "../../shared/globals/deep-copy";


@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss']
})
export class LifestyleComponent implements OnInit {

  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['Position', 'CategoryIcon', 'Category', 'Cost', 'Delete', 'Tag'];


  @Input() Lifestyle: Lifestyle = {
    Description: "This is a dummy lifestyle, made for development.",
    Id: uuidv4(),
    Items: [{
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Category: Category.groceries,
      CategoryIcon: Category.groceries,
      Tag: "Groceries",
      Cost: 0,
    }],
    Name: 'LifeStyle',
    TaxRates: [40, 42],
  };

  @Output() deleteLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = this.Lifestyle.Items;
  }

  getItems(): Item[] {
    return this.Lifestyle.Items;
  }

  getItemById(givenId: uuidv4): Item {
    const result = this.Lifestyle.Items.filter(item => item.Id === givenId)[0];

    return result ? result : null;
  }

  addItem(item: Item) {
    this.Lifestyle.Items.push(item);
    this.updateTableData(this.Lifestyle.Items);
  }

  removeItem(item: Item) {

    const indexOfItem = this.Lifestyle.Items.indexOf(item);

    if(indexOfItem < 0)
      return null;

    this.Lifestyle.Items.splice(indexOfItem, 1);
    this.updateTableData(this.Lifestyle.Items);
  }

  updateItemById(id: uuidv4, newItem: Item) {
    const itemToUpdate = this.Lifestyle.Items.filter(item => item.Id === id)[0];

    itemToUpdate ? (() => {
      const indexOfItem = this.Lifestyle.Items.indexOf(itemToUpdate);
      this.Lifestyle.Items.splice(indexOfItem, 1, newItem);
    })() : (() => {
      return null
    })();

  }

  calculateTotal(inputNumbers: number[]): number {
    return inputNumbers.reduce((a, b) => a + b, 0);
  }

  calculateAfterTaxes(amount: number, taxesInteger: number): number {
    return amount * (100 - taxesInteger) * 0.01;
  }

  clearItems(): boolean {
    this.Lifestyle.Items = [];
    return this.Lifestyle.Items.length === 0;

  }

  returnEnumValue(number: number): string {
    return Object.values(Category).includes(number) ? Category[number].toString() : Category[0].toString();
  }

  HandleButtonDeleteItem(item: Item) {
    this.removeItem(item);
  }

  HandleButtonDeleteLifestyle(lifestyle: Lifestyle){
    this.deleteLifestyle.emit(lifestyle);
  }

  updateTableData(newItems: Item[]) {

    if(newItems.length <= 0)
      return null;

    this.dataSource.data = newItems;
  }

  HandleAddButton() {
    this.addItem({
      Id: uuidv4(),
      Tag: 'new item',
      Cost: 0,
      CategoryIcon: Category.none,
      Category: Category.none
    })
  }
}
