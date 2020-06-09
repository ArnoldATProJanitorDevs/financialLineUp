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
      Id: uuidv4(),
      Category: Category.groceries,
      CategoryIcon: Category.groceries,
      Tag: "Groceries",
      Cost: 0
    }],
    Name: 'LifeStyle',
    TaxRates: [40,42],
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
    this.Lifestyle.Items.filter(item => item.Id === id)[0] = newItem;
  }

  calculateTotal(inputNumbers: number[]): number {
    return inputNumbers.reduce((a, b) => a + b, 0);
  }

  calculateAfterTaxes(amount: number, taxesInteger: number): number {
    return amount * (100 - taxesInteger) * 0.01;
  }

  changeItemCategory(category: Category, item: Item) {
    this.Lifestyle.Items.filter(item => item === item).map(item => {
      item.Category = category;
      item.CategoryIcon = category;
    });
  }
}
