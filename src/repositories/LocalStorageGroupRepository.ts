import type { Group, Expense } from '../models/types';
import type { GroupRepository } from './GroupRepository';

export class LocalStorageGroupRepository implements GroupRepository {
  private readonly storageKey = 'chill-bill-groups';

  // Helper to safely get data from localStorage
  private getStoredGroups(): Group[] {
    try {
      const data = localStorage.getItem(this.storageKey);

      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  // Helper to save data
  private saveGroups(groups: Group[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(groups));
    } catch {
      throw new Error('Failed to save data');
      // later we might notify the user
      // that storage is full or blocked.
    }
  }

  // --- Implement the interface methods ---

  getAll(): Group[] {
    return this.getStoredGroups();
  }

  getById(id: string): Group | undefined {
    return this.getAll().find((group) => group.id === id);
  }

  addGroup(group: Group): void {
    const groups = this.getAll();
    groups.push(group);
    this.saveGroups(groups);
  }

  updateGroup(group: Group): void {
    const groups = this.getAll();
    const updatedGroups = groups.map((g) => (g.id === group.id ? group : g));
    this.saveGroups(updatedGroups);
  }

  removeGroup(id: string): void {
    const groups = this.getAll().filter((group) => group.id !== id);
    this.saveGroups(groups);
  }

  addExpense(groupId: string, expense: Expense): void {
    const groups = this.getAll();
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      group.expenses.push(expense);
      this.saveGroups(groups);
    }
  }

  updateExpense(groupId: string, expense: Expense): void {
    const groups = this.getAll();
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      group.expenses = group.expenses.map((e) => (e.id === expense.id ? expense : e));
      this.saveGroups(groups);
    }
  }

  removeExpense(groupId: string, expenseId: string): void {
    const groups = this.getAll();
    const group = groups.find((g) => g.id === groupId);

    if (group) {
      group.expenses = group.expenses.filter((e) => e.id !== expenseId);
      this.saveGroups(groups);
    }
  }
}
