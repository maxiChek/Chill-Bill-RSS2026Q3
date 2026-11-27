import { store } from './store';
import type { GroupRepository } from '../repositories/GroupRepository';
import type { Group, Expense } from '../models/types';
import type { Screen } from '../models/types';

export function createActions(repository: GroupRepository) {
  function loadGroups(): void {
    const groups = repository.getAll();
    store.setState({ groups });
  }

  function seedGroups(groups: Group[]): void {
    if (repository.getAll().length !== 0) return;
    groups.forEach((group) => repository.addGroup(group));
    loadGroups();
  }

  function navigateTo(screen: Screen, groupId: string | null = null): void {
    store.setState({ currentScreen: screen, activeGroupId: groupId });
  }

  function createGroup(group: Group): void {
    repository.addGroup(group);
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'group-details', activeGroupId: group.id });
  }

  function addExpense(groupId: string, expense: Expense): void {
    repository.addExpense(groupId, expense);
    const groups = repository.getAll();
    store.setState({
      groups,
      currentScreen: 'group-details',
      activeGroupId: groupId, // на всякий случай
    });
  }

  function removeExpense(groupId: string, expenseId: string): void {
    repository.removeExpense(groupId, expenseId);
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'group-details', activeGroupId: groupId });
  }

  function removeGroup(groupId: string): void {
    repository.removeGroup(groupId);
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'groups', activeGroupId: null });
  }

  function updateGroup(updatedGroup: Group): void {
    repository.updateGroup(updatedGroup);
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'group-details', activeGroupId: updatedGroup.id });
  }

  function addMember(groupId: string, name: string): void {
    const groups = repository.getAll();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedGroup = {
      ...group,
      members: [...group.members, { id: crypto.randomUUID(), name }],
    };

    updateGroup(updatedGroup);
  }

  function editMember(groupId: string, memberId: string, name: string): void {
    const groups = repository.getAll();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedGroup = {
      ...group,
      members: group.members.map((m) => (m.id === memberId ? { ...m, name } : m)),
    };

    updateGroup(updatedGroup);
  }

  function removeMember(groupId: string, memberId: string): void {
    const groups = repository.getAll();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedGroup = {
      ...group,
      members: group.members.filter((m) => m.id !== memberId),
    };

    updateGroup(updatedGroup);
  }

  return {
    loadGroups,
    seedGroups,
    navigateTo,
    createGroup,
    addExpense,
    removeExpense,
    removeGroup,
    updateGroup,
    addMember,
    editMember,
    removeMember,
  };
}
