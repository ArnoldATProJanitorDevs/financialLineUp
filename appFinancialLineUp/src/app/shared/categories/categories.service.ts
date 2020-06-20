import { Injectable } from '@angular/core';
import {Category} from "../../items/models/category.interface";
import {Observable, of} from "rxjs";
import {Categories} from "./categories";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }



  getExistingCategoryOrDefault(Category: any | Category) {
    const existingCategory = Categories.filter(cat => cat.name == Category.name)[0];
    return existingCategory ? existingCategory : this.getDefaultCategory();
  }

  getDefaultCategory(): Category {
   return Categories[0];
  }

  getCategoriesAsObservable(): Observable<Category[]> {
    return of(Categories);
  }
}
