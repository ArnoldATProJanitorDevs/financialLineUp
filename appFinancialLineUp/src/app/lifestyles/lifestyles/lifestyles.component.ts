import {Component, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {Category} from "../../item/models/category.interface";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy {

  Lifestyles$: Observable<LifestylesDictionary>;
  Lifestyles: LifestylesDictionary = {};

  Categories$: Observable<Category[]>;
  Categories: Category[];

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }



  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();
    this.Categories$ = this.lifestyleFacade.getCategoriesAll();

    this.addSubscriptions();

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

  private static makeDeepCopyForLocalModification(object: any) {
    return deepCopy(object);
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

  addLifestyle() {
    const newUuuid = uuidv4();
    this.Lifestyles[newUuuid] = {
      Id: newUuuid,
      Name: 'New Lifestyle',
      TaxRates: [40],
      Description: 'Newly added Lifestyle',
      Items: [{
        Id: uuidv4(),
        Category: {name: 'housing', icon: 'home'},
        Cost: 0,
        Comment: 'new Comment'
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

  }
}

