import {Categories} from "./categories";
import {of} from "rxjs";
import {CategoryGroups} from "./category-groups.interface";


export enum CategoryGroup {
  Housing,
  Transportation,
  Food,
  Utilities,
  Clothing,
  Healthcare,
  Medical,
  Insurance,
  Household ,
  Personal,
  Debt,
  Education,
  Sport,
  Savings,
  Donations,
  Entertainment,
  Children,
  Garden,
  Business,
  Other

}

export function getCategoryGroupsAsObservable() {
  return of(mapCategoriesToGroups());
}


export function mapCategoriesToGroups(): CategoryGroups[] {
  let groups = [];
  let i = 0;

  for (let item in CategoryGroup) {
    if (!isNaN(Number(item))) {
      groups.push({
        name: CategoryGroup[item].toString(),
        group: []
      });

      Categories.map(cat => {
        if (cat.group.toString() === item.toString()) {
          groups[i].group.push(cat);
        }
      });
      i++;
    }
  }
  return groups;
}
