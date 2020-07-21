import {Category} from "../../shared/categories/category.interface";
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  LifestyleId: uuidv4;
  Id: uuidv4;
  Comment: string;
  Category: Category;
  Cost: number;
  Index: number;
}




