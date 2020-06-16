import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {IncomeBasis} from "../models/incomeBasis";
import {LifeStyleCosts} from "../models/lifestylecosts.interface";

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss']
})
export class LifestyleComponent implements OnInit, DoCheck {

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

  Costs: LifeStyleCosts = {
    BeforeTaxes: {Daily: 0, Weekly: 0, Monthly: 0, Yearly: 0},
    AfterTaxes: []
  };

  //TODO: NGRX UI StateManaging
  showSummary = false;
  showTaxes = false;


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

    return this.Lifestyle.Items = this.Lifestyle.Items.filter(oldItem => oldItem.Id !== item.Id);
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

  ngDoCheck(): void {
    this.calculateExpenses();
  }

  //TODO: Export into Service or own component.
  calculateExpenses() {

    const DAILYMULTIPLIER = 1 / 30;
    const WEEKLYMULTIPLIER = 1 / 4;
    const MONTHLYMULTIPLIER = 1;
    const YEARLYMULTIPLIER = 12;

    const monthlyExpensesBeforeTaxes = this.calculateTotal(this.Lifestyle.Items.map(item => item.Cost));

    this.Costs.BeforeTaxes.Daily = monthlyExpensesBeforeTaxes * DAILYMULTIPLIER;
    this.Costs.BeforeTaxes.Weekly = monthlyExpensesBeforeTaxes * WEEKLYMULTIPLIER;
    this.Costs.BeforeTaxes.Monthly = monthlyExpensesBeforeTaxes * MONTHLYMULTIPLIER;
    this.Costs.BeforeTaxes.Yearly = monthlyExpensesBeforeTaxes * YEARLYMULTIPLIER;

    this.Costs.AfterTaxes = this.Lifestyle.TaxRates.map((taxrate): IncomeBasis => {
      const monthlyExpensesAfterTaxes = this.calculatePercentage(monthlyExpensesBeforeTaxes, taxrate);

      return {
        Daily: monthlyExpensesAfterTaxes * DAILYMULTIPLIER,
        Weekly: monthlyExpensesAfterTaxes * WEEKLYMULTIPLIER,
        Monthly: monthlyExpensesAfterTaxes * MONTHLYMULTIPLIER,
        Yearly: monthlyExpensesAfterTaxes * YEARLYMULTIPLIER
      }
    });
  }


  calculateTotal(inputNumbers: number[]): number {
    return inputNumbers.reduce((a, b) => a + b, 0);
  }

  calculatePercentage(amount: number, percentageInteger: number): number {
    return roundToTwo(amount / ((100 - percentageInteger) * 0.01));
  }


  clearItems(): boolean {
    this.Lifestyle.Items = [];
    return this.Lifestyle.Items.length === 0;

  }

  HandleButtonDeleteItem(item: Item) {
    this.Lifestyle.Items = this.removeItem(item);
    this.updateItemsInDataTable(this.Lifestyle.Items);
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

  HandleAddItemButton() {
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

  HandleSummaryExpandButton() {
    this.showSummary = !this.showSummary;
  }

  HandleTaxesExpandButton() {
    this.showTaxes = !this.showTaxes;
  }

  HandleAddTaxrateButton() {
    this.addTaxrate();
  }

  HandleRemoveTaxrateButton(index: number) {
    this.removeTaxrate(index);
  }

  addTaxrate() {
    this.Lifestyle.TaxRates.push(0);
  }

  removeTaxrate(index: number) {
    this.Lifestyle.TaxRates.splice(index, 1)
  }


  updateTaxrate(i: number, value: number) {
    this.Lifestyle.TaxRates[i] = value;
  }

  HandleCopyButton(Lifestyle: Lifestyle) {

  }
}

function roundToTwo(num) {
  return +(`${Math.round(Number(`${num}e+2`))}e-2`);
}

