import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Item} from "../../item/models/item.interface";
import {Category} from "../../item/models/category.interface";
import {MatSelectChange} from "@angular/material/select";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() Items: Item[] = [];

  @Output() ItemsChanged: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  //TODO: From NGRX
  @Input() Categories: Category[] = [{name: 'housing', icon: 'house'}];


  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['CategoryIcon', 'Category', 'Comment', 'Cost', 'Delete'];


  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.Items;
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

    const item = this.Items.filter(item => item.Id === element.Id)[0];
    item.Category = this.Categories.filter(cat => cat.name == event.value)[0];

  }

  HandleButtonDeleteItem(item: Item) {
    this.Items = this.removeItem(item);
    this.updateItemsInDataTable(this.Items);
  }

  removeItem(item: Item): Item[] {

    this.Items = this.Items.filter(oldItem => oldItem.Id !== item.Id);
    this.publishChanges(this.Items);
    return this.Items;

  }

  updateItemsInDataTable(newItems?: Item[]) {
    if (!newItems || newItems.length <= 0) {
      this.dataSource.data = this.Items;
      return;
    }

    this.dataSource.data = newItems;
  }

  clearDataTable() {
    this.dataSource.data = [];
  }

  getItemById(givenId: uuidv4): Item {
    const result = this.Items.filter(item => item.Id === givenId)[0];

    return result ? result : null;
  }

  getCategoryByName(name: string): Category {
    return this.Categories.find(category => category.name === name);
  }

  getCategoryIndex(category: Category): number {
    return this.Categories.indexOf(category);
  }

  HandleAddItemButton() {
    this.addItem({
      Id: uuidv4(),
      Comment: 'NEW ITEM',
      Cost: 0,
      Category: {name: 'housing', icon: 'home'}
    })
  }


  addItem(item: Item) {
    this.Items.push(item);
    this.updateItemsInDataTable(this.Items);
  }

  private publishChanges(Items: Item[]) {
    this.ItemsChanged.emit(Items);
  }

  updateItemById(id: uuidv4, newItem: Item) {

    const itemToUpdate = this.getItemById(id);

    itemToUpdate ? (() => {
      this.Items = this.Items.map(item => {
        if (item.Id === newItem.Id)
          return newItem;

        return item;
      });

    })() : (() => {
      return null
    })();
  }

  getItems(): Item[] {
    return this.Items;
  }

  clearItems(): boolean {
    this.Items = [];
    return this.Items.length === 0;

  }

}
