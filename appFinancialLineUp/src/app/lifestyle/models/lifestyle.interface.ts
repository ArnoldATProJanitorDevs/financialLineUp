import { v4 as uuidv4 } from 'uuid';
import {ItemDictionary} from "../../items/models/itemDictionary.interface";

export interface Lifestyle {
  Id: uuidv4;
  TaxRates: number[];
  Name: string;
  Description: string;
  Items: ItemDictionary;
}
