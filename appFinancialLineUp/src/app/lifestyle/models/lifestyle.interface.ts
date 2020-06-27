import { v4 as uuidv4 } from 'uuid';
import {Item} from "../../items/models/item.interface";

export interface Lifestyle {
  Id: uuidv4;
  TaxRates: number[];
  Name: string;
  Description: string;
  Items: ItemDictionary;
}

export interface ItemDictionary{
  [id: string]: Item;
}
