import type { Group, Expense } from '../models/types';

export interface GroupRepository {
  getAll(): Group[];
  getById(id: string): Group | undefined;

  addGroup(group: Group): void;
  updateGroup(group: Group): void;
  removeGroup(id: string): void;

  addExpense(groupId: string, expense: Expense): void;
  removeExpense(groupId: string, expenseId: string): void;
  updateExpense(groupId: string, expense: Expense): void;
}
