import {Category} from "./category.interface";
import { v4 as uuidv4 } from 'uuid';

export interface Item {
  Id: uuidv4;
  Comment: string;
  Category: Category;
  Cost: number;
}



