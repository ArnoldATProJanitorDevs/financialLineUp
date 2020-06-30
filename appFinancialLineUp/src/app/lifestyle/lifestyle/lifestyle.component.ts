import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ItemDictionary, Lifestyle} from "../models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {SummaryComponent} from "../../summary/summary/summary.component";
import {ItemsComponent} from "../../items/items/items.component";
import {TaxratesComponent} from "../../taxrates/taxrates/taxrates.component";
import {Category} from "../../items/models/category.interface";
import {Item} from "../../items/models/item.interface";
import {LifestylesFacade} from "../../lifestyles/+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {deepCopy} from "../../shared/globals/deep-copy";

const fixedId = uuidv4();

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent {

  @Input() Lifestyle: Lifestyle = {
    Description: "THIS IS A DEFAULT LIFESTYLE, MADE FOR DEVELOPMENT.",
    Id: fixedId,
    Items: {
      ['11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000']: {
        LifestyleId: fixedId,
        Id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        Category: {name: 'housing', icon: 'home'},
        Comment: "Groceries",
        Cost: 0,
      }
    },
    Name: 'DEFAULT LIFESTYLE',
    TaxRates: [40, 42],
  };

  @Output() deleteLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();
  @Output() EventCopyLifestyle: EventEmitter<Lifestyle> = new EventEmitter<Lifestyle>();


  isEdit = false;

  constructor(private cdRef: ChangeDetectorRef, private lifestyleFacade: LifestylesFacade) {
  }


  HandleButtonDeleteLifestyle(lifestyle: Lifestyle) {
    this.deleteLifeStyle(lifestyle);
  }

  deleteLifeStyle(lifestyle: Lifestyle) {
    this.lifestyleFacade.deleteLifestyle([lifestyle]);
  }

  HandleExportButton(lifestyle: Lifestyle) {
    this.lifestyleFacade.getLifeStyleById(lifestyle.Id).pipe(take(1)).subscribe(
      next => console.log("Export:", lifestyle)
    )
  }

  HandleShareButton(lifestyle: Lifestyle) {
    console.log("Cloud:", lifestyle);
    this.lifestyleFacade.pushLifeStyleIntoCloud([lifestyle]);
  }

  HandleDuplicateButton(Lifestyle: Lifestyle) {
    this.duplicateLifestyle(Lifestyle);
  }

  duplicateLifestyle(lifestyle: Lifestyle) {
    const fixUuid = uuidv4();

    const Lifestyle: Lifestyle = {
      Id: fixUuid,
      TaxRates: lifestyle.TaxRates,
      Name: 'COPY ' + lifestyle.Name,
      Items: adjustLifestyleId(deepCopy(lifestyle.Items), fixUuid),
      Description: lifestyle.Description
    };

    function adjustLifestyleId(Items: ItemDictionary, Id: string) {
      Object.values(Items).map(item => item.LifestyleId = Id);

      return Items;
    }

    this.lifestyleFacade.updateLifestyles(Lifestyle);
    this.lifestyleFacade.updateLifestyleItem(Object.values(Lifestyle.Items));

  }


  getItemsAsArray() {
    return Object.values(this.Lifestyle.Items)
  }

  synchronize() {
    this.lifestyleFacade.updateLifestyles(this.Lifestyle)
  }


}

