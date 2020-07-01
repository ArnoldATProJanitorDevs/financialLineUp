import {CategoryGroup} from "./category-groups";

export interface Category {
  name: string;
  icon: string;
  group?: CategoryGroup
}
