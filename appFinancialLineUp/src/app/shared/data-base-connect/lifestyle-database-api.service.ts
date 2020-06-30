import {Injectable} from '@angular/core';
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/firestore";
import {combineLatest, Observable} from "rxjs";
import {map, take} from "rxjs/operators";

@Injectable()
export class LifestyleDatabaseApiService {

  constructor(private db: AngularFirestore) {
  }

  CreateLifeStyles(lifestyles: Lifestyle[]) {

    lifestyles.map(lifestyle => {

      const databaseEntry = {
        Id: lifestyle.Id,
        Description: lifestyle.Description,
        Name: lifestyle.Name,
        TaxRates: lifestyle.TaxRates,
        Items: lifestyle.Items ? lifestyle.Items : [{
          Id: uuidv4(),
          Category: {name: 'car', icon: 'transportation_car'},
          Cost: 0,
          Comment: 'NEW ITEM'
        }],
      };

      function createNewEntry() {
        databaseEntry["Created"] = new Date();
        return databaseEntry;
      }

      function updateEntry() {
        databaseEntry["Updated"] = new Date();
        return databaseEntry;
      }

      (this.db.collection("lifestyles").doc(lifestyle.Id).valueChanges() as Observable<Lifestyle>)
        .pipe(
          take(1),
          map(next => {
            if (!next) {
              this.UpdateLifeStyle(createNewEntry.call(this));
            } else {
              if (next !== databaseEntry)
                this.UpdateLifeStyle(updateEntry.call(this));
            }
          }),
        ).subscribe();
    });

  }

  GetLifeStyles(): Observable<DocumentChangeAction<Lifestyle>[]> {
    return this.db.collection('lifestyles').snapshotChanges() as Observable<DocumentChangeAction<Lifestyle>[]>;
  }

  GetLifeStylesById(Id: uuidv4[]):Observable<Lifestyle[][]> {

    const fieldName = 'Id';

    const lifestyles2 = Id.map(id => this.db.collection('lifestyles',
      (ref) => {
        return ref.where(fieldName, '==', id).limit(1)
      }).valueChanges() as Observable<Lifestyle[]>);

    return combineLatest(...lifestyles2);
  }

  UpdateLifeStyle(lifestyle: Lifestyle) {
    this.db.collection("lifestyles").doc(lifestyle.Id).set(lifestyle, {merge: true});
  }

  DeleteLifeStyle(Id: uuidv4) {
    this.db.collection("lifestyles").doc(Id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
}
