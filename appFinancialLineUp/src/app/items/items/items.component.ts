import {
  Component,
  Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges,
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../models/item.interface";
import {Category} from "../models/category.interface";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {deepCopy} from "../../shared/globals/deep-copy";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() LifestyleId: string;

  Categories: Category[] = [];
  Items: Item[] = [];

  displayedColumns: string[] = ['CategoryIcon', 'Category', 'Comment', 'Cost', 'Delete'];
  tableData = new MatTableDataSource<Item>();

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }

  ngOnInit(): void {
    this.getCategoriesFromStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.unsubscribeAll();
    this.setUpSubscriptions();
  }

  setUpSubscriptions() {
    this.subs.push(this.lifestyleFacade.getLifestyleItemsByLifestyleId(this.LifestyleId).pipe().subscribe(
      next => {
        if (next) {
          this.Items = deepCopy(Object.values(next));
          this.updateItemsInDataTable(this.Items);
        }
      }
    ));
  }

  getCategoriesFromStore() {
    this.lifestyleFacade.getCategoriesAll().pipe(take(1)).subscribe(
      next => {
        this.Categories = next;
      }
    );
  }

  handleToggleButton(event: Category, itemOfTable) {

    this.toggleToNextCategory(event, itemOfTable);
  }

  toggleToNextCategory(category: Category, Item: Item) {

    const itemCopy = deepCopy(this.getItemById(Item.Id));
    const currentCategory = this.getCategoryByName(category.name);
    const indexOfNextCategory = this.getCategoryIndex(currentCategory) + 1;

    if ((indexOfNextCategory) >= this.Categories.length)
      itemCopy.Category = this.Categories[0];
    else
      itemCopy.Category = this.Categories[indexOfNextCategory];

    this.synchronize(itemCopy);
  }


  handleCategoryDropdown(event: MatSelectChange, element) {
    this.updateCategory(event.value, element);

  }

  updateCategory(newValue: string, Item: Item) {
    const item = deepCopy(this.Items.filter(item => item.Id === Item.Id)[0]);
    item.Category = this.Categories.filter(cat => cat.name == newValue)[0];
    this.synchronize(item);
  }


  HandleAddItemButton() {
    this.addItem({
      LifestyleId: this.LifestyleId,
      Id: uuidv4(),
      Comment: 'NEW ITEM',
      Cost: 0,
      Category: {name: 'housing', icon: 'home'}
    })
  }


  addItem(item: Item) {
    this.Items.push(item);
    this.synchronize(item);
  }

  synchronize(item: Item) {
    this.lifestyleFacade.updateLifestyleItem([item]);
  }

  HandleButtonDeleteItem(item: Item) {
    this.deleteItem(item)
  }

  deleteItem(item: Item) {
    this.lifestyleFacade.deleteLifestyleItem(item);
  }

  updateItemsInDataTable(newItems?: Item[]) {
    if (!newItems || newItems.length <= 0) {
      this.tableData.data = this.Items;
      return;
    }

    this.tableData.data = newItems;
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

  trackById(item: Item) {
    return item.Id;
  }

  unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
