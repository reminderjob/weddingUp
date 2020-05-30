import { Expenses } from './expenses';

export interface Host {
  id: string;
  name: string;
  BudgetAmount: number;
  expenses?: Expenses;
}
