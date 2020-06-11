import {Component, Input, OnInit} from '@angular/core';
import {Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.enum";


@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss']
})
export class LifestyleComponent implements OnInit {


  @Input() Lifestyle: Lifestyle = {
    Description: "DummyLifeStyle",
    Id: uuidv4(),
    Items: [{
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Category: Category.groceries,
      CategoryIcon: Category.groceries,
      Tag: "Groceries",
      Cost: 0
    }],
    Name: 'LifeStyle',
    TaxRates: [40, 42],
  };

  constructor() {
  }

  ngOnInit(): void {
  }


  getItems(): Item[] {
    return this.Lifestyle.Items;
  }

  getItemById(givenId: uuidv4): Item {
    return this.Lifestyle.Items.filter(item => item.Id === givenId)[0];
  }

  addItem(item: Item) {
    this.Lifestyle.Items.push(item);
  }

  removeItem(item: Item) {
    this.Lifestyle.Items.splice(this.Lifestyle.Items.indexOf(item), 1);
  }

  updateItemById(id: uuidv4, newItem: Item) {
    const itemToUpdate = this.Lifestyle.Items.filter(item => item.Id === id)[0];
    const indexOfItem = this.Lifestyle.Items.indexOf(itemToUpdate);
    this.Lifestyle.Items.splice(indexOfItem, 1, newItem);
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
}
