import { store } from './store';
import type { GroupRepository } from '../repositories/GroupRepository';
import type { Group, Expense } from '../models/types';
import type { Screen } from '../models/types';

// Dependency Injection???
export function createActions(repository: GroupRepository) {
  function loadGroups(): void {
    const groups = repository.getAll();
    store.setState({ groups });
  }

  function navigateTo(screen: Screen, groupId: string | null = null): void {
    store.setState({ currentScreen: screen, activeGroupId: groupId });
  }

  function createGroup(group: Group): void {
    repository.addGroup(group); // сохраняет в localStorage
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'group-details', activeGroupId: group.id });
  }

  function addExpense(groupId: string, expense: Expense): void {
    repository.addExpense(groupId, expense); // сохраняет в localStorage
    const groups = repository.getAll();
    store.setState({ groups });
  }

  return {
    loadGroups,
    navigateTo,
    createGroup,
    addExpense,
  };
}
