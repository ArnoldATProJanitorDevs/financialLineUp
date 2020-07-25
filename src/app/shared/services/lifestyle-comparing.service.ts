import {Injectable} from '@angular/core';
import {LifestylesDictionary} from "../../lifestyles/models/lifestylesDictionary.interface";
import {ItemDictionary} from "../../items/models/itemDictionary.interface";
import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";

@Injectable({
  providedIn: 'root'
})
export class LifestyleComparingService {

  constructor() {
  }

  ifLargerThan(larger: number, than: number) {
    if (!larger || (!larger && !than))
      return false;

    if (larger > than || !than)
      return true;

    return false;
  }


  ifEqual(lifestylesA: LifestylesDictionary, lifestylesB: LifestylesDictionary) {
    let isEqual = false;
    const Ids = Object.values(lifestylesA).map(ls => ls.Id);

    for (let Id of Ids) {
      isEqual = this.checkIfLifestylesAreEqual(lifestylesA[Id], lifestylesB[Id]);

      if (!isEqual)
        break;
    }

    return isEqual;
  }

  checkIfLifestylesAreEqual(ls1: Lifestyle, ls2: Lifestyle) {

    if (!this.compareStringsForEquality(ls1.Id, ls2.Id))
      return false;

    if (!this.compareStringsForEquality(ls1.Name, ls2.Name))
      return false;

    if (!this.compareStringsForEquality(ls1.Description, ls2.Description))
      return false;

    if (!this.compareNumberArrayForEquality(ls1.TaxRates, ls2.TaxRates))
      return false;

    if (!ls1.Items || !ls2.Items)
      return false;

    if (Object.values(ls1.Items).length != Object.values(ls2.Items).length)
      return false;

    if (!this.compareItemDictionaryForEquality(ls1.Items, ls2.Items))
      return false;

    return true;
  }

  compareStringsForEquality(string1: string, string2: string) {
    return string1 === string2;
  }

  compareNumberArrayForEquality(arr1: number[], arr2: number[]) {

    if (!arr1 || !arr2) return false;

    let result = false;

    arr1.forEach(e1 => arr2.forEach(e2 => {
        result = e1 == e2;
      })
    );

    return result;
  }

  compareItemDictionaryForEquality(Items: ItemDictionary, Items2: ItemDictionary) {

    let isEqual = true;

    if (!Items || !Items2)
      return false;

    const Ids = Object.values(Items).map(item => item.Id);

    Ids.forEach(Id => {
        if (Items[Id]?.Cost != Items2[Id]?.Cost) {
          isEqual = false;
        }
        if (Items[Id]?.Comment != Items2[Id]?.Comment) {
          isEqual = false;
        }
        if (Items[Id]?.LifestyleId != Items2[Id]?.LifestyleId) {
          isEqual = false;
        }
        if (Items[Id]?.Id != Items2[Id]?.Id) {
          isEqual = false;
        }
        if (Items[Id]?.Category.name != Items2[Id]?.Category.name) {
          isEqual = false;
        }
        if (Items[Id]?.Category.icon != Items2[Id]?.Category.icon) {
          isEqual = false;
        }
      }
    );

    return isEqual;
  }
}
