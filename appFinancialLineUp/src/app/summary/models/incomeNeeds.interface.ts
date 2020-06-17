import {ExpensesInterface} from "./expenses.interface";

export interface IncomeNeeds{
  BeforeTaxes: ExpensesInterface;
  AfterTaxes: ExpensesInterface[];
}
