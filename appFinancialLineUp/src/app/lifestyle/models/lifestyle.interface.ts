import { v4 as uuidv4 } from 'uuid';
import {Item} from "../../item/models/item.interface";
import {LifeStyleCosts} from "./lifestylecosts.interface";

export interface Lifestyle {
  Id: uuidv4;
  TaxRates: number[];
  Name: string;
  Description: string;
  Items: Item[];
}
