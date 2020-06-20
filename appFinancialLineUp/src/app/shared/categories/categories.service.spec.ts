import {TestBed} from '@angular/core/testing';

import {CategoriesService} from './categories.service';
import {Categories} from "./categories";
import {Observable} from "rxjs";
import {Category} from "../../items/models/category.interface";
import {type} from "os";

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getExistingCategoryOrDefault - should always return a category', () => {
    const faultyInput = service.getExistingCategoryOrDefault( {name: 'faulty', icon: 'faulty'});
    const faultyInput2 = service.getExistingCategoryOrDefault( {test: 'notGood'});
    const goodInput = service.getExistingCategoryOrDefault({name: 'shopping', icon: 'shopping_basket'});

    const goodExpected = {name: 'shopping', icon: 'shopping_basket'};

    expect(faultyInput).toEqual(Categories[0]);
    expect(faultyInput2).toEqual(Categories[0]);
    expect(goodInput).toEqual(goodExpected);
  });

  it('getDefaultCategory - should always return a category number 1', () => {

    const result = service.getDefaultCategory();

    expect(result).toEqual(Categories[0]);
  });


  //TODO: Install Jest for Observables together with the other tests.
  it('getCategoriesAsObservable - should always return a categories as observable', () => {

  });

});
