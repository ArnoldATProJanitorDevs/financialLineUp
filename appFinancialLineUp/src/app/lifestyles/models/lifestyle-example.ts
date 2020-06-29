import {Lifestyle} from "../../lifestyle/models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';
import {ItemDictionary} from "../../lifestyle/models/lifestyle.interface";
import {LifestylesDictionary} from "../+state/lifestyles.effects";

const fixedId = uuidv4();
const fixedId2 = uuidv4();

export const ExampleLifestyles: LifestylesDictionary = {
  ['alone']: {
    Id: 'alone',
    Name: 'Alone',
    TaxRates: [42],
    Items: {
      [fixedId]: {
        LifestyleId: 'alone',
        Id: fixedId,
        Cost: 20,
        Category: {name: 'housing', icon: 'home'},
        Comment: "Rent"
      },
      [fixedId2]: {
        LifestyleId: 'alone',
        Id: fixedId2,
        Cost: 20,
        Category: {name: 'insurance', icon: 'security'},
        Comment: "Rent"
      }
    },
    Description: 'This is an example for ...'
  },
  ['together']:
    {
      Id: 'together',
      Name: 'Together',
      TaxRates: [35],
      Items: {
        [fixedId]: {
          LifestyleId: 'together',
          Id: fixedId,
          Cost: 20,
          Category: {name: 'housing', icon: 'home'},
          Comment: "Rent"
        },
        [fixedId2]:
          {
            LifestyleId: 'together',
            Id: fixedId2,
            Cost: 20,
            Category: {name: 'groceries', icon: 'kitchen'},
            Comment: "Food"
          }
      },
      Description: 'This is an example for ...'
    }
};
