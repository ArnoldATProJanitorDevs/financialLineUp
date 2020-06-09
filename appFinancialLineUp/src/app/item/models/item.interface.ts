import {Category} from "./category.enum";
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  Id: uuidv4;
  Tag: string;
  CategoryIcon: Category;
  Category: Category;
  Cost: number;
}

