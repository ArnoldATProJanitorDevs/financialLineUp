import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss']
})
export class LifestyleComponent implements OnInit {

  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['CategoryIcon', 'Category', 'Comment', 'Cost', 'Delete'];

  @Input() Categories: Category[] = [{name: 'housing', icon: 'house'}];
  @Input() Lifestyle: Lifestyle = {
    Description: "This is a dummy lifestyle, made for development.",
    Id: uuidv4(),
    Items: [{
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Category: {name: 'housing', icon: 'home'},
      Comment: "Groceries",
      Cost: 0,
    }],
    Name: 'LifeStyle',
    TaxRates: [40, 42],
  };

  @Output() deleteLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();
  isEdit = false;


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
    this.updateItemsInDataTable(this.Lifestyle.Items);
  }

  removeItem(item: Item): Item[] {

    const indexOfDeletion = this.getIndexOfItem(item);

    if (indexOfDeletion < 0)
      return null;

    return this.Lifestyle.Items.splice(indexOfDeletion, 1);
  }

  updateItemById(id: uuidv4, newItem: Item) {

    const itemToUpdate = this.getItemById(id);

    itemToUpdate ? (() => {
      this.Lifestyle.Items = this.Lifestyle.Items.map(item => {
        if (item.Id === newItem.Id)
          return newItem;

        return item;
      });

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

  HandleButtonDeleteItem(item: Item) {
    const updatedList = this.removeItem(item);
    this.updateItemsInDataTable(updatedList);
  }

  HandleButtonDeleteLifestyle(lifestyle: Lifestyle) {
    this.deleteLifestyle.emit(lifestyle);
  }

  updateItemsInDataTable(newItems?: Item[]) {
    if (!newItems || newItems.length <= 0) {
      this.dataSource.data = this.Lifestyle.Items;
      return;
    }

    this.dataSource.data = newItems;
  }

  clearDataTable() {
    this.dataSource.data = [];
  }

  HandleAddButton() {
    this.addItem({
      Id: uuidv4(),
      Comment: 'new item',
      Cost: 0,
      Category: {name: 'housing', icon: 'home'}
    })
  }

  toggleBetweenCategories(event: Category, itemOfTable) {

    const item = this.getItemById(itemOfTable.Id);
    const currentCategory = this.getCategoryByName(event.name);
    const indexOfCurrentCategory = this.getCategoryIndex(currentCategory);
    const indexOfNextCategory = indexOfCurrentCategory + 1;

    if ((indexOfNextCategory) >= this.Categories.length)
      item.Category = this.Categories[0];
    else
      item.Category = this.Categories[indexOfNextCategory];
  }

  updateCategory(event: MatSelectChange, element) {

    const item = this.Lifestyle.Items.filter(item => item.Id === element.Id)[0];
    item.Category = this.Categories.filter(cat => cat.name == event.value)[0];

  }

  getCategoryByName(name: string): Category {
    return this.Categories.find(category => category.name === name);
  }

  getCategoryIndex(category: Category): number {
    return this.Categories.indexOf(category);
  }

  HandleExportButton(lifestyle: Lifestyle) {
    console.log("Export:", lifestyle);
  }

  getIndexOfItem(item: Item): number {
    return this.Lifestyle.Items.indexOf(item);
  }
}
