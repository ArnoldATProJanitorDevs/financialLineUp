import {CategoryGroups} from "./category-groups.interface";
import {Categories} from "./categories";
import {CategoryGroup} from "./category-groups";
import {of} from "rxjs";

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

export function getCategoryGroupsAsObservable() {
  return of(mapCategoriesToGroups());
}
