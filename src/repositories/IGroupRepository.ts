import type { Group, Expense } from '../models/types';

export interface IGroupRepository {
  // Read operations
  getAll(): Group[];
  getById(id: string): Group | undefined;

  // Write operations
  addGroup(group: Group): void;
  updateGroup(group: Group): void;
  removeGroup(id: string): void;

  // Domain-specific operations
  addExpense(groupId: string, expense: Expense): void;
  removeExpense(groupId: string, expenseId: string): void;
}
