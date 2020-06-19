import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {SummaryComponent} from "../../summary/summary/summary.component";
import {ItemsComponent} from "../../items/items/items.component";
import {TaxratesComponent} from "../../taxrates/taxrates/taxrates.component";
import {Category} from "../../items/models/category.interface";
import {Item} from "../../items/models/item.interface";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent implements DoCheck, AfterViewInit {

  @ViewChild('summary') SummaryComponent: SummaryComponent;
  @ViewChild('items') ItemsComponent: ItemsComponent;
  @ViewChild('taxrates') TaxratesComponent: TaxratesComponent;

  @Input() Categories: Category[] = [{name: 'housing', icon: 'house'}];
  @Input() Lifestyle: Lifestyle = {
    Description: "THIS IS A DEFAULT LIFESTYLE, MADE FOR DEVELOPMENT.",
    Id: uuidv4(),
    Items: [{
      Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      Category: {name: 'housing', icon: 'home'},
      Comment: "Groceries",
      Cost: 0,
    }],
    Name: 'DEFAULT LIFESTYLE',
    TaxRates: [40, 42],
  };

  @Output() deleteLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();
  @Output() EventCopyLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();


  isEdit = false;

  constructor(private cdRef: ChangeDetectorRef, private lifestyleFacade: LifestylesFacade) {
  }

  ngDoCheck(): void {
    this.CalculateSummary();
  }

  HandleButtonDeleteLifestyle(lifestyle: Lifestyle) {
    this.deleteLifestyle.emit(lifestyle);
  }

  HandleExportButton(lifestyle: Lifestyle) {
    console.log("Export:", lifestyle);
  }

  HandleCloudUploadButton(lifestyle: Lifestyle) {
    console.log("Cloud:", lifestyle);
    this.lifestyleFacade.pushLifeStyleIntoCloud([lifestyle]);
  }

  HandleCopyButton(Lifestyle: Lifestyle) {
    this.EventCopyLifestyle.emit(Lifestyle);
  }

  ngAfterViewInit(): void {
    this.CalculateSummary();
  }

  updateItems(event: Item[]) {
    this.Lifestyle.Items = event;
    this.cdRef.detectChanges();
  }

  updateTaxrates(event: number[]) {
    this.Lifestyle.TaxRates = event;
    this.cdRef.detectChanges();
  }

  private CalculateSummary() {
    this.SummaryComponent?.calculateExpenses();
  }
}

