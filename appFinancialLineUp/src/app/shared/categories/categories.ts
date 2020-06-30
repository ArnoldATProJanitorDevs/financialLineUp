import {Category} from "../../items/models/category.interface";
import {of} from "rxjs";

export function getCategoriesAsObservable() {
  return of(Categories);
}

export const Categories: Category[] = [
  {
    name: 'housing',
    icon: 'home'
  },
  {
    name: 'car',
    icon: 'directions_car'
  },
  {
    name: 'transportation',
    icon: 'directions_transit'
  },
  {
    name: 'business',
    icon: 'business'
  },
  {
    name: 'groceries',
    icon: 'kitchen'
  },
  {
    name: 'shopping',
    icon: 'shopping_basket'
  },
  {
    name: 'insurance',
    icon: 'security'
  },
  {
    name: 'donation',
    icon: 'support'
  },
  {
    name: 'technology',
    icon: 'tv'
  },
  {
    name: 'gaming',
    icon: 'gamepad'
  },
  {
    name: 'streaming',
    icon: 'play_arrow'
  },
  {
    name: 'dining',
    icon: 'local_dining'
  },
  {
    name: 'sport',
    icon: 'directions_run'
  },
  {
    name: 'children',
    icon: 'child_friendly'
  },
  {
    name: 'entertainment',
    icon: 'local_bar'
  },
  {
    name: 'telecommunication',
    icon: 'local_phone'
  },
  {
    name: 'contributions',
    icon: 'attach_money'
  },
  {
    name: 'services',
    icon: 'room_service'
  },
  {
    name: 'education',
    icon: 'local_library'
  },
  {
    name: 'loan',
    icon: 'payment'
  },
  {
    name: 'healthcare',
    icon: 'local_hospital'
  },
  {
    name: 'utilities',
    icon: 'build'
  },
  {
    name: 'savings',
    icon: 'account_balance'
  },
  {
    name: 'apparel',
    icon: 'style'
  },
  {
    name: 'technic',
    icon: 'computer'
  },
  {
    name: 'travel',
    icon: 'local_airport'
  },
  {
    name: 'holiday',
    icon: 'deck'
  },
  {
    name: 'garden',
    icon: 'eco'
  },
  {
    name: 'office',
    icon: 'attach_file'
  },
  {
    name: 'diversity',
    icon: 'category'
  },
  {
    name: 'work',
    icon: 'work_outline'
  }
];
