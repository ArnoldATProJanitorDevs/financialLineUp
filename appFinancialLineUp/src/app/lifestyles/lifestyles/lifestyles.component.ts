import {Component, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {LifestylesDictionary} from "../+state/lifestyles.effects";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {Category} from "../../item/models/category.enum";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy {

  Lifestyles$: Observable<LifestylesDictionary>;
  Lifestyles: LifestylesDictionary = {};
  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade) {
  }



  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();

    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = LifestylesComponent.makeDeepCopyForLocalModification(next);
      }
    ));
  }

  private static makeDeepCopyForLocalModification(object: LifestylesDictionary) {
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
        Category: Category.none,
        CategoryIcon: Category.none,
        Cost: 0,
        Tag: 'newly added Category'
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

