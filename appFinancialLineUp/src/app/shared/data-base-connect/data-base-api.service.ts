import {Injectable, OnInit} from '@angular/core';
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {AngularFirestore, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/firestore";
import {combineLatest, forkJoin, Observable, of} from "rxjs";
import {catchError, delay, filter, finalize, map, switchMap, take, throwIfEmpty} from "rxjs/operators";

@Injectable()
export class DataBaseApiService {

  constructor(private db: AngularFirestore) {
  }

  CreateLifeStyles(lifestyles: Lifestyle[]) {

    let lifestylesRef = this.db.collection("lifestyles");
    const fieldName = 'Id';


    let sub;

    lifestyles.map(lifestyle => {
      sub = this.db.collection("lifestyles").doc(lifestyle.Id).valueChanges()
        .pipe(
          take(1),
          map(next => {
            if (!next) {
              return lifestylesRef.doc(lifestyle.Id).set({
                Id: lifestyle.Id,
                Description: lifestyle.Description,
                Name: lifestyle.Name,
                TaxRates: lifestyle.TaxRates,
                Items: lifestyle.Items ? lifestyle.Items : [{
                  Id: uuidv4(),
                  Category: {name: 'housing', icon: 'home'},
                  Cost: 0,
                  Comment: 'NEW ITEM'
                }],
              })
            }
          }),
        ).subscribe();
    });

  }

  GetLifeStyles(): Observable<DocumentChangeAction<Lifestyle>[]> {
    return this.db.collection('lifestyles').snapshotChanges() as Observable<DocumentChangeAction<Lifestyle>[]>;
  }

  GetLifeStylesById(Id: uuidv4[]) {

    const fieldName = 'Id';

    const lifestyles2 = Id.map(id => this.db.collection('lifestyles',
      (ref) => {
        return ref.where(fieldName, '==', id).limit(1)
      }).valueChanges() as Observable<Lifestyle[]>);

    return combineLatest(...lifestyles2);
  }

  UpdateLifeStyle(lifeStyle: Lifestyle): Lifestyle {
    return {Description: "", Id: undefined, Items: [], Name: "", TaxRates: []}
  }

  DeleteLifeStyle(Id: uuidv4): boolean {
    return false;
  }


}
