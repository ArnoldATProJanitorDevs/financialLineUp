import {v4 as uuidv4} from 'uuid';
import {LifestylesDictionary} from "./lifestylesDictionary.interface";
import {of} from "rxjs";


export function getExampleLifestyles() {
  return ExampleLifestyles;
}

export function getExampleLifestylesAsObservable() {
  return of(ExampleLifestyles);
}


const fixedId = uuidv4();
const fixedId2 = uuidv4();
const fixedId3 = uuidv4();

export const ExampleLifestyles: LifestylesDictionary = {
  [fixedId]: {
    Id: fixedId,
    Name: 'Alone',
    TaxRates: [42],
    Items: {
      [fixedId2]: {
        LifestyleId: fixedId,
        Id: fixedId2,
        Cost: 20,
        Category: {name: 'housing', icon: 'house'},
        Comment: "Re1"
      },
      [fixedId3]: {
        LifestyleId: fixedId,
        Id: fixedId3,
        Cost: 20,
        Category: {name: 'insurance', icon: 'security'},
        Comment: "In1"
      }
    },
    Description: 'This is an example for ...'
  },
  [fixedId3]:
    {
      Id: fixedId3,
      Name: 'Together',
      TaxRates: [35],
      Items: {
        [fixedId]: {
          LifestyleId: fixedId3,
          Id: fixedId,
          Cost: 20,
          Category: {name: 'housing', icon: 'house'},
          Comment: "Re2"
        },
        [fixedId2]:
          {
            LifestyleId: fixedId3,
            Id: fixedId2,
            Cost: 20,
            Category: {name: 'groceries', icon: 'kitchen'},
            Comment: "Fo2"
          }
      },
      Description: 'This is an example for ...'
    }
};
