import {Component, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {Category} from "../../items/models/category.interface";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy {

  Lifestyles$: Observable<LifestylesDictionary>;
  Lifestyles: LifestylesDictionary = {};

  Categories$: Observable<Category[]>;
  Categories: Category[] = [];

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }

  private static makeDeepCopyForLocalModification(object: any) {
    return deepCopy(object);
  }

  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();
    this.Categories$ = this.lifestyleFacade.getCategoriesAll();

    this.addSubscriptions();

  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

  addNewLifestyle() {
    const newUuuid = uuidv4();
    this.Lifestyles[newUuuid] = {
      Id: newUuuid,
      Name: 'NEW LIFESTYLE',
      TaxRates: [40],
      Description: 'NEW DESCRIPTION',
      Items: [{
        Id: uuidv4(),
        Category: {name: 'housing', icon: 'home'},
        Cost: 0,
        Comment: 'NEW COMMENT'
      }]
    };
  }

  OnDeleteLifestyle(lifestyle: Lifestyle) {
    this.DeleteLifeStyle(lifestyle);
  }

  DeleteLifeStyle(lifestyle: Lifestyle) {
    delete this.Lifestyles[lifestyle.Id];
  }

  exportLifestyles() {

  }

  importLifestyles() {

  }

  uploadLifestyles() {
    this.lifestyleFacade.pushLifeStyleIntoCloud(convertDictionaryToArray(this.Lifestyles));
  }

  deleteAllLifestyles() {

  }

  CopyLifestyle(lifestyle: Lifestyle) {
    const uuid = uuidv4();
    this.Lifestyles[uuid] = {
      Id: uuid,
      TaxRates: lifestyle.TaxRates,
      Name: lifestyle.Name + ' COPY',
      Items: lifestyle.Items,
      Description: lifestyle.Description
    };
  }

  trackById(lifestyle: Lifestyle) {
    return lifestyle.Id;
  }

  private addSubscriptions() {
    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = LifestylesComponent.makeDeepCopyForLocalModification(next);
      }
    ));

    this.subs.push(this.Categories$.subscribe(next => {
        this.Categories = LifestylesComponent.makeDeepCopyForLocalModification(next);
      }
    ));
  }
}

function convertDictionaryToArray(dictionary: any){

  let array = [];

  for (let key in dictionary) {
    array.push(dictionary[key]);
  }

  return array;
}

