import { Expenses } from './expenses';

export interface Host {
  id: string;
  username: string;
  BudgetAmount: number;
  expenses?: Expenses;
}
