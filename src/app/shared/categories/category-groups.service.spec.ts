import "jest-extended";
import {mapToMapExpression} from "@angular/compiler/src/render3/util";
import {mapCategoriesToGroups} from "./category-groups.service";
import {Categories} from "./categories";
import {CategoryGroup} from "./category-groups";
import {TestBed} from "@angular/core/testing";
import {LifestyleComponent} from "../../lifestyle/lifestyle/lifestyle.component";
import {getExampleLifestyles} from "../../lifestyles/models/lifestyle-example";


describe('mapCategoriesToGroups', () => {
  let numberOfCategories: number = 0;

  beforeEach(() => {
    for (let item in CategoryGroup) {
      if (!isNaN(Number(item))) {
        numberOfCategories++
      }
    }
  });

  it('mapCategoriesToGroups - convert each category to its group and have a max number of groups of lenght of group - enum', () => {
    const returnedGroups = mapCategoriesToGroups();
    expect(returnedGroups.length).toBe(numberOfCategories)
  });


});
