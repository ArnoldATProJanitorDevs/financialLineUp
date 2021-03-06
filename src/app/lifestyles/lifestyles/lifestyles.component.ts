import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {LifestylesFacade} from '../+state/lifestyles.facade';
import {Observable, Subscription} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {deepCopy} from '../../shared/globals/deep-copy';
import {LifestylesDictionary} from '../models/lifestylesDictionary.interface';
import {Lifestyle} from '../../lifestyle/models/lifestyle.interface';
import {ComponentCanDeactivate} from '../../shared/guards/pending-changes.guard';
import {LifestyleDatabaseApiService} from '../../shared/data-base-connect/lifestyle-database-api.service';
import {take} from 'rxjs/operators';
import {convertLifestyleArrayToDictionary} from '../+state/lifestyles.effects';
import {LifestyleComparingService} from '../../shared/services/lifestyle-comparing.service';
import {MatDialog} from '@angular/material/dialog';
import {ExportDialogComponent} from '../../shared/modalDialog/export-dialog.component';

@Component({
  selector: 'app-lifestyles',
  templateUrl: './lifestyles.component.html',
  styleUrls: ['./lifestyles.component.scss']
})
export class LifestylesComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  Lifestyles$: Observable<LifestylesDictionary> = new Observable<LifestylesDictionary>();
  Lifestyles: LifestylesDictionary = {};
  unsavedChanges = false;
  sharingAvailable = false;
  private subs: Subscription[] = [];
  limitLifestyles = 5;
  lifestylesCount = 0;

  constructor(private lifestyleFacade: LifestylesFacade,
              private lifestyleDatabaseApiService: LifestyleDatabaseApiService,
              private comparer: LifestyleComparingService,
              public dialog: MatDialog
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


  HandleAddNewLifestyleButton() {
    if (this.lifestylesCount >= this.limitLifestyles) {
      return;
    }

    this.addNewLifestyle();
  }

  HandleExportLifestyleButton(Lifestyles: LifestylesDictionary) {
      this.exportLifestyles(Lifestyles);
  }

  HandleShareLifestylesButton() {
      this.shareLifestyles(this.Lifestyles);
  }

  private addNewLifestyle() {

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
          Comment: 'Rent',
          Index: 0
        },
      }
    };

    this.lifestyleFacade.updateLifestyles(Lifestyle);
  }

  private exportLifestyles(lifestyles: LifestylesDictionary) {
    this.lifestyleFacade.exportLifestyles(Object.values(lifestyles));
  }

  importLifestyles() {
    // TODO: Implement IMPORT service
    console.log('IMPORT');
  }

  private shareLifestyles(Lifestyles: LifestylesDictionary) {
    if (this.sharingAvailable) {
      this.lifestyleFacade.pushLifeStyleIntoCloud(Object.values(Lifestyles));
    } else {
      this.openDialog();
    }

  }


  trackById(lifestyle: Lifestyle): string {
    return lifestyle.Id;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '650px',
      data: {}
    });

    this.handleDialogReturn(dialogRef);
  }

  ngOnDestroy(): void {
    this.subs.map(sub => sub.unsubscribe());
  }


  private handleDialogReturn(dialogRef) {
    dialogRef.afterClosed().subscribe(result => {
      if (result?.export) {
        this.exportLifestyles(this.Lifestyles);
      }
    });
  }

  private setUpSubscriptions() {
    this.subs.push(this.Lifestyles$.subscribe(next => {
        this.Lifestyles = deepCopy(next);
        this.lifestylesCount = Object.values(this.Lifestyles).length;

        this.compareLocalLifestylesWithBackend(next);
      }
    ));
  }

  private compareLocalLifestylesWithBackend(lifestyles: LifestylesDictionary) {
    const Ids = Object.values(lifestyles).map(lifestyle => {
      return lifestyle.Id;
    });

    this.lifestyleDatabaseApiService.GetLifeStylesById(Ids).pipe(take(1)).subscribe(next => {
      const concatenatedLifestyles: Lifestyle[] = [].concat(...next);
      const lifestyleDictionary = convertLifestyleArrayToDictionary(concatenatedLifestyles);

      this.unsavedChanges = this.comparer.ifLargerThan(Object.values(this.Lifestyles).length, concatenatedLifestyles.length);

      if (!this.unsavedChanges) {
        this.unsavedChanges = !this.comparer.ifEqual(this.Lifestyles, lifestyleDictionary);
      }
    });
  }



}


