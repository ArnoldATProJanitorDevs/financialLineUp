import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from "../+state/lifestyles.facade";
import {Observable, Subscription} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from "../../shared/globals/deep-copy";
import {LifestylesDictionary} from "../models/lifestylesDictionary.interface";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {ComponentCanDeactivate} from "../../shared/guards/pending-changes.guard";
import {LifestyleDatabaseApiService} from "../../shared/data-base-connect/lifestyle-database-api.service";
import {take} from "rxjs/operators";
import {convertLifestyleArrayToDictionary} from "../+state/lifestyles.effects";
import {ComparerHelpFunctionsService} from "../../shared/services/comparer-help-functions.service";


@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  Lifestyles$: Observable<LifestylesDictionary>;
  Lifestyles: LifestylesDictionary = {};
  unsavedChanges = false;

  private subs: Subscription[] = [];

  constructor(private lifestyleFacade: LifestylesFacade,
              private lifestyleDatabaseApiService: LifestyleDatabaseApiService,
              private comparer: ComparerHelpFunctionsService
  ) {
  }

  @HostListener('window:beforeunload') canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return !this.unsavedChanges;
  }

  ngOnInit(): void {
    this.Lifestyles$ = this.lifestyleFacade.getLifeStylesAll();
    this.setUpSubscriptions();

  }


  addNewLifestyle() {
    const lifestyleId = uuidv4();
    const itemId = uuidv4();

    const Lifestyle: Lifestyle = {
      Id: lifestyleId,
      Name: 'NEW LIFESTYLE',
      TaxRates: [40],
      Description: 'NEW DESCRIPTION',
      Items: {
        [itemId]: {
          LifestyleId: lifestyleId,
          Id: itemId,
          Cost: 20,
          Category: {name: 'housing', icon: 'home'},
          Comment: "Rent"
        },
      }
    };

    this.lifestyleFacade.updateLifestyles(Lifestyle);
  }

  exportLifestyles(lifestyles: LifestylesDictionary) {

  }

  importLifestyles() {

  }

  shareLifestyles() {
    this.lifestyleFacade.pushLifeStyleIntoCloud(Object.values(this.Lifestyles));
  }

  trackById(lifestyle: Lifestyle): string {
    return lifestyle.Id;
  }


  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }

  private setUpSubscriptions() {
    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = deepCopy(next);

        this.compareLocalLifestylesWithBackend(next);
      }
    ));
  }

  private compareLocalLifestylesWithBackend(lifestyles: LifestylesDictionary) {
    const Ids = Object.values(lifestyles).map(lifestyle => {
      return lifestyle.Id
    });

    this.lifestyleDatabaseApiService.GetLifeStylesById(Ids).pipe(take(1)).subscribe(next => {
      const lifestyles: Lifestyle[] = [].concat(...next);
      const lifestyleDictionary = convertLifestyleArrayToDictionary(lifestyles);

      this.unsavedChanges = this.comparer.ifLargerThan(Object.values(this.Lifestyles).length, lifestyles.length);
      if (!this.unsavedChanges)
        this.unsavedChanges = !this.comparer.ifEqual(this.Lifestyles, lifestyleDictionary);
    });
  }

}
