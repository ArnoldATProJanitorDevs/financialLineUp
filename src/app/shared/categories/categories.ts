import {Category} from "./category.interface";
import {of} from "rxjs";
import {CategoryGroup} from "./category-groups";

export function getCategoriesAsObservable() {
  return of(Categories);
}

export const Categories: Category[] = [
  {
    name: 'housing',
    icon: 'house',
    group: CategoryGroup.Housing
  },
  {
    name: 'rent',
    icon: 'house_siding',
    group: CategoryGroup.Housing
  },
  {
    name: 'mortgage',
    icon: 'foundation',
    group: CategoryGroup.Housing
  },
  {
    name: 'property taxes',
    icon: 'home_work',
    group: CategoryGroup.Housing
  },
  {
    name: 'household repairs',
    icon: 'home_repair_service',
    group: CategoryGroup.Housing
  },
  {
    name: 'hoa fees',
    icon: 'home',
    group: CategoryGroup.Housing
  },
  {
    name: 'Transportation',
    icon: 'commute',
    group: CategoryGroup.Transportation
  },
  {
    name: 'car payment',
    icon: 'directions_car',
    group: CategoryGroup.Transportation
  },
  {
    name: 'car warranty',
    icon: 'directions_car',
    group: CategoryGroup.Transportation
  },
  {
    name: 'car wash',
    icon: 'local_car_wash',
    group: CategoryGroup.Transportation
  },
  {
    name: 'fuel',
    icon: 'local_gas_station',
    group: CategoryGroup.Transportation
  },
  {
    name: 'diesel',
    icon: 'local_gas_station',
    group: CategoryGroup.Transportation
  },
  {
    name: 'gas',
    icon: 'local_gas_station',
    group: CategoryGroup.Transportation
  },
  {
    name: 'electric',
    icon: 'ev_station',
    group: CategoryGroup.Transportation
  },
  {
    name: 'maintenance and oil changes',
    icon: 'handyman',
    group: CategoryGroup.Transportation
  },
  {
    name: 'parking fees',
    icon: 'local_parking',
    group: CategoryGroup.Transportation
  },
  {
    name: 'tolls',
    icon: 'toll',
    group: CategoryGroup.Transportation
  },
  {
    name: 'registration and dmv fees',
    icon: 'account_balance',
    group: CategoryGroup.Transportation
  },
  {
    name: 'repairs',
    icon: 'handyman',
    group: CategoryGroup.Transportation
  },
  {
    name: 'food',
    icon: 'fastfood',
    group: CategoryGroup.Food
  },
  {
    name: 'groceries',
    icon: 'kitchen',
    group: CategoryGroup.Food
  },
  {
    name: 'restaurants',
    icon: 'restaurant',
    group: CategoryGroup.Food
  },
  {
    name: 'pet food',
    icon: 'pets',
    group: CategoryGroup.Food
  },
  {
    name: 'utilities',
    icon: 'build_circle',
    group: CategoryGroup.Utilities
  },
  {
    name: 'electricity',
    icon: 'electrical_services',
    group: CategoryGroup.Utilities
  },
  {
    name: 'water',
    icon: 'water_damage',
    group: CategoryGroup.Utilities
  },
  {
    name: 'garbage',
    icon: 'delete',
    group: CategoryGroup.Utilities
  },
  {
    name: 'phones',
    icon: 'phone',
    group: CategoryGroup.Utilities
  },
  {
    name: 'cable',
    icon: 'tv',
    group: CategoryGroup.Utilities
  },
  {
    name: 'internet',
    icon: 'alternate_email',
    group: CategoryGroup.Utilities
  },
  {
    name: 'clothing',
    icon: 'style',
    group: CategoryGroup.Clothing
  },
  {
    name: 'adults’ clothing',
    icon: 'style',
    group: CategoryGroup.Clothing
  },
  {
    name: 'adults’ shoes',
    icon: 'style',
    group: CategoryGroup.Clothing
  },
  {
    name: 'children',
    icon: 'child_friendly',
    group: CategoryGroup.Children
  },
  {
    name: 'children supplies',
    icon: 'stroller',
    group: CategoryGroup.Children
  },
  {
    name: 'children’s shoes',
    icon: 'style',
    group: CategoryGroup.Children
  },
  {
    name: 'children’s clothing',
    icon: 'style',
    group: CategoryGroup.Children
  },
  {
    name: 'healthcare',
    icon: 'local_hospital',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'primary care',
    icon: 'local_hotel',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'dental care',
    icon: 'child_care',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'dermatologists',
    icon: 'clean_hands',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'urgent care',
    icon: 'medical_services',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'medical devices',
    icon: 'local_hospital',
    group: CategoryGroup.Healthcare
  },
  {
    name: 'medical',
    icon: 'local_hospital',
    group: CategoryGroup.Medical
  },
  {
    name: 'medications',
    icon: 'sanitizer',
    group: CategoryGroup.Medical
  },
  {
    name: 'insurance',
    icon: 'security',
    group: CategoryGroup.Insurance
  },
  {
    name: 'health insurance',
    icon: 'local_pharmacy',
    group: CategoryGroup.Insurance
  },
  {
    name: 'homeowner’s insurance',
    icon: 'home_work',
    group: CategoryGroup.Insurance
  },
  {
    name: 'renter’s  insurance',
    icon: 'home_work',
    group: CategoryGroup.Insurance
  },
  {
    name: 'auto insurance',
    icon: 'electric_car',
    group: CategoryGroup.Insurance
  },
  {
    name: 'life insurance',
    icon: 'accessibility_new',
    group: CategoryGroup.Insurance
  },
  {
    name: 'disability insurance',
    icon: 'accessible_forward',
    group: CategoryGroup.Insurance
  },
  {
    name: 'household',
    icon: 'foundation',
    group: CategoryGroup.Household
  },
  {
    name: 'toiletries',
    icon: 'wc',
    group: CategoryGroup.Household
  },
  {
    name: 'laundry detergent',
    icon: 'local_laundry_service',
    group: CategoryGroup.Household
  },
  {
    name: 'dishwasher detergent',
    icon: 'set_meal',
    group: CategoryGroup.Household
  },
  {
    name: 'cleaning supplies',
    icon: 'cleaning_services',
    group: CategoryGroup.Household
  },
  {
    name: 'tools',
    icon: 'pan_tool',
    group: CategoryGroup.Household
  },
  {
    name: 'personal',
    icon: 'person',
    group: CategoryGroup.Personal
  },
  {
    name: 'gym membership',
    icon: 'fitness_center',
    group: CategoryGroup.Personal
  },
  {
    name: 'yoga course',
    icon: 'self_improvement',
    group: CategoryGroup.Personal
  },
  {
    name: 'haircuts',
    icon: 'content_cut',
    group: CategoryGroup.Personal
  },
  {
    name: 'salon services',
    icon: 'store',
    group: CategoryGroup.Personal
  },
  {
    name: 'cosmetics',
    icon: 'sentiment_satisfied_alt',
    group: CategoryGroup.Personal
  },
  {
    name: 'makeup',
    icon: 'face',
    group: CategoryGroup.Personal
  },
  {
    name: 'laser hair removal',
    icon: 'remove_circle_outline',
    group: CategoryGroup.Personal
  },
  {
    name: 'babysitter',
    icon: 'baby_changing_station',
    group: CategoryGroup.Children
  },
  {
    name: 'streaming',
    icon: 'video_library',
    group: CategoryGroup.Personal
  },
  {
    name: 'subscriptions',
    icon: 'subscriptions',
    group: CategoryGroup.Personal
  },
  {
    name: 'debt',
    icon: 'money_off',
    group: CategoryGroup.Debt
  },
  {
    name: 'personal loans',
    icon: 'how_to_reg',
    group: CategoryGroup.Debt
  },
  {
    name: 'student loans',
    icon: 'account_balance',
    group: CategoryGroup.Debt
  },
  {
    name: 'credit cards',
    icon: 'credit_card',
    group: CategoryGroup.Debt
  },
  {
    name: 'children’s college',
    icon: 'escalator_warning',
    group: CategoryGroup.Debt
  },
  {
    name: 'your college',
    icon: 'cast_for_education',
    group: CategoryGroup.Debt
  },

  {
    name: 'sport',
    icon: 'directions_run',
    group: CategoryGroup.Sport
  },
  {
    name: 'cricket',
    icon: 'sports_cricket',
    group: CategoryGroup.Sport
  },
  {
    name: 'baseball',
    icon: 'sports_baseball',
    group: CategoryGroup.Sport
  },
  {
    name: 'basketball',
    icon: 'sports_basketball',
    group: CategoryGroup.Sport
  },
  {
    name: 'esports',
    icon: 'sports_esports',
    group: CategoryGroup.Sport
  },
  {
    name: 'football',
    icon: 'sports_football',
    group: CategoryGroup.Sport
  },
  {
    name: 'golf',
    icon: 'golf_course',
    group: CategoryGroup.Sport
  },
  {
    name: 'handball',
    icon: 'sports_handball',
    group: CategoryGroup.Sport
  },
  {
    name: 'hockey',
    icon: 'sports_hockey',
    group: CategoryGroup.Sport
  },
  {
    name: 'mma',
    icon: 'sports_mma',
    group: CategoryGroup.Sport
  },
  {
    name: 'motorsports',
    icon: 'sports_motorsports',
    group: CategoryGroup.Sport
  },
  {
    name: 'rugby',
    icon: 'sports_rugby',
    group: CategoryGroup.Sport
  },
  {
    name: 'soccer',
    icon: 'sports_soccer',
    group: CategoryGroup.Sport
  },
  {
    name: 'tennis',
    icon: 'sports_tennis',
    group: CategoryGroup.Sport
  },
  {
    name: 'volleyball',
    icon: 'sports_volleyball',
    group: CategoryGroup.Sport
  },
  {
    name: 'swimming',
    icon: 'pool',
    group: CategoryGroup.Sport
  },

  {
    name: 'education',
    icon: 'local_library',
    group: CategoryGroup.Education
  },
  {
    name: 'school supplies',
    icon: 'design_services',
    group: CategoryGroup.Education
  }, {
    name: 'books',
    icon: 'book',
    group: CategoryGroup.Education
  },
  {
    name: 'professional magazines',
    icon: 'sticky_note_2',
    group: CategoryGroup.Education
  },
  {
    name: 'magazines',
    icon: 'note',
    group: CategoryGroup.Education
  },
  {
    name: 'savings',
    icon: 'save',
    group: CategoryGroup.Savings
  },
  {
    name: 'emergency fund',
    icon: 'local_hospital',
    group: CategoryGroup.Savings
  },
  {
    name: 'big purchases',
    icon: 'weekend',
    group: CategoryGroup.Savings
  },
  {
    name: 'other savings',
    icon: 'attach_money',
    group: CategoryGroup.Savings
  },
  {
    name: 'donations',
    icon: 'support',
    group: CategoryGroup.Donations
  },
  {
    name: 'birthday',
    icon: 'cake',
    group: CategoryGroup.Donations
  },
  {
    name: 'anniversary',
    icon: 'history_edu',
    group: CategoryGroup.Donations
  },
  {
    name: 'wedding',
    icon: 'people',
    group: CategoryGroup.Donations
  },
  {
    name: 'special occasion',
    icon: 'folder_special',
    group: CategoryGroup.Donations
  },
  {
    name: 'charities',
    icon: 'supervised_user_circle',
    group: CategoryGroup.Donations
  },
  {
    name: 'entertainment',
    icon: 'local_movies',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'alcohol',
    icon: 'wine_bar',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'bars',
    icon: 'local_bar',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'night clubs',
    icon: 'nights_stay',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'games',
    icon: 'games',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'movies',
    icon: 'movie',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'cinema',
    icon: 'local_play',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'theatre',
    icon: 'theaters',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'concerts',
    icon: 'mic',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'vacation',
    icon: 'deck',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'subscription',
    icon: 'subscriptions',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'shopping',
    icon: 'shopping_basket',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'dining',
    icon: 'local_dining',
    group: CategoryGroup.Entertainment
  },
  {
    name: 'services',
    icon: 'room_service',
    group: CategoryGroup.Personal
  },
  {
    name: 'apparel',
    icon: 'style',
    group: CategoryGroup.Personal
  },
  {
    name: 'technic',
    icon: 'computer',
    group: CategoryGroup.Personal
  },
  {
    name: 'travel',
    icon: 'local_airport',
    group: CategoryGroup.Transportation
  },
  {
    name: 'garden',
    icon: 'eco',
    group: CategoryGroup.Garden
  },
  {
    name: 'tools',
    icon: 'carpenter',
    group: CategoryGroup.Garden
  },
  {
    name: 'plants',
    icon: 'spa',
    group: CategoryGroup.Garden
  },
  {
    name: 'gardening services',
    icon: 'rv_hookup',
    group: CategoryGroup.Garden
  },
  {
    name: 'grass',
    icon: 'grass',
    group: CategoryGroup.Garden
  },
  {
    name: 'flowers',
    icon: 'local_florist',
    group: CategoryGroup.Garden
  },
  {
    name: 'anti vermins',
    icon: 'bug_report',
    group: CategoryGroup.Garden
  },

  {
    name: 'anti weed',
    icon: 'grass',
    group: CategoryGroup.Garden
  },
  {
    name: 'fertilizer',
    icon: 'brightness_high',
    group: CategoryGroup.Garden
  },
  {
    name: 'pesticides',
    icon: 'bug_report',
    group: CategoryGroup.Garden
  },
  {
    name: 'business',
    icon: 'payments',
    group: CategoryGroup.Business
  },
  {
    name: 'office supplies',
    icon: 'attach_file',
    group: CategoryGroup.Business
  },
  {
    name: 'copy paper',
    icon: 'file_copy',
    group: CategoryGroup.Business
  },
  {
    name: 'envelopes',
    icon: 'drafts',
    group: CategoryGroup.Business
  },
  {
    name: 'file folders',
    icon: 'folder',
    group: CategoryGroup.Business
  },
  {
    name: 'sticky notes',
    icon: 'sticky_note_2',
    group: CategoryGroup.Business
  },
  {
    name: 'pens',
    icon: 'create',
    group: CategoryGroup.Business
  },
  {
    name: 'rulers',
    icon: 'square_foot',
    group: CategoryGroup.Business
  },
  {
    name: 'business pcs',
    icon: 'desktop_windows',
    group: CategoryGroup.Business
  },
  {
    name: 'laptops',
    icon: 'laptop_windows',
    group: CategoryGroup.Business
  },
  {
    name: 'mobile phones',
    icon: 'phone_iphone',
    group: CategoryGroup.Business
  },
  {
    name: 'tablets',
    icon: 'tablet_mac',
    group: CategoryGroup.Business
  },
  {
    name: 'office utilities',
    icon: 'account_tree',
    group: CategoryGroup.Business
  },
  {
    name: 'other',
    icon: 'category',
    group: CategoryGroup.Other
  }

];
