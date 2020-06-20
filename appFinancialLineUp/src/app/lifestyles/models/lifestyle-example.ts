import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';


export const ExampleLifestyles: Lifestyle[] = [
  {
    Id: uuidv4(),
    Name: 'Living Alone',
    TaxRates: [42],
    Items: [{
      Id: uuidv4(),
      Cost: 40,
      Category: {name: 'house', icon: 'house'},
      Comment: "Example Item"
    }],
    Description: 'This is an example for ...'
  },
  {
    Id: uuidv4(),
    Name: 'Living Together',
    TaxRates: [35],
    Items: [{
      Id: uuidv4(),
      Cost: 20,
      Category: {name: 'house', icon: 'house'},
      Comment: "Example Item"
    }],
    Description: 'This is an example for ...'
  }
];
