import {
  Component,
  Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges,
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {v4 as uuidv4} from 'uuid';
import {Item} from "../models/item.interface";
import {Category} from "../../shared/categories/category.interface";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {deepCopy} from "../../shared/globals/deep-copy";
import {CategoryGroups} from "../../shared/categories/category-groups.interface";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() LifestyleId: string;

  Categories: Category[] = [];
  CategoryGroups: CategoryGroups[] = [];
  Items: Item[] = [];

  displayedColumns: string[] = ['CategoryIcon', 'Category', 'Comment', 'Cost', 'Delete'];
  tableData = new MatTableDataSource<Item>();

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }

  ngOnInit(): void {
    this.getCategoriesFromStore();
    this.getCategoryGroupsFromStore();
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
          this.Items.sort(this.orderByIndex);

          this.updateItemsInDataTable(this.Items);
        }
      }
    ));
  }





  getCategoryGroupsFromStore() {
    this.lifestyleFacade.getCategoryGroupsAll().pipe(take(1)).subscribe(
      next => {
        this.CategoryGroups = next;
      }
    );
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

  handleCategoryDropdown(event: MatSelectChange, element) {
    this.updateCategory(event.value, element);

  }

  HandleAddItemButton() {
    this.addItem({
      LifestyleId: this.LifestyleId,
      Id: uuidv4(),
      Comment: 'NEW ITEM',
      Cost: 0,
      Category: {name: 'housing', icon: 'home'},
      Index: this.Items.length
    })
  }

  synchronize(item: Item) {
    this.lifestyleFacade.updateLifestyleItem([item]);
  }

  HandleButtonDeleteItem(item: Item) {
    this.deleteItem(item)
  }

  getItemById(givenId: uuidv4): Item {
    const result = this.Items.filter(item => item.Id === givenId)[0];
    return null ;
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

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private orderByIndex(a: Item, b: Item) {
    if (a.Index < b.Index) {
      return -1;
    }
    if (a.Index > b.Index) {
      return 1;
    }
    return 0;
  }

  private toggleToNextCategory(category: Category, Item: Item) {

    const itemCopy = deepCopy(this.getItemById(Item.Id));
    const currentCategory = this.getCategoryByName(category.name);
    const indexOfNextCategory = this.getCategoryIndex(currentCategory) + 1;

    if ((indexOfNextCategory) >= this.Categories.length)
      itemCopy.Category = this.Categories[0];
    else
      itemCopy.Category = this.Categories[indexOfNextCategory];

    this.synchronize(itemCopy);
  }

  private updateCategory(newValue: string, Item: Item) {
    const item = deepCopy(this.Items.filter(item => item.Id === Item.Id)[0]);
    item.Category = this.Categories.filter(cat => cat.name == newValue)[0];
    this.synchronize(item);
  }

  private addItem(item: Item) {
    this.Items.push(item);
    this.Items.sort(this.orderByIndex);
    this.synchronize(item);
  }

  private deleteItem(item: Item) {
    this.lifestyleFacade.deleteLifestyleItem(item);
  }

  private updateItemsInDataTable(newItems?: Item[]) {
    if (!newItems || newItems.length <= 0) {
      this.tableData.data = this.Items;
      return;
    }

    this.tableData.data = newItems;
  }

  private unsubscribeAll() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
