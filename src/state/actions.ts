import { store } from './store';
import type { GroupRepository } from '../repositories/GroupRepository';
import type { Group, Expense, Member } from '../models/types';
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
    repository.addGroup(group);
    const groups = repository.getAll();
    store.setState({ groups, currentScreen: 'group-details', activeGroupId: group.id });
  }

  function addExpense(groupId: string, expense: Expense): void {
    repository.addExpense(groupId, expense);
    const groups = repository.getAll();
    store.setState({ groups });
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

  function addMember(groupId: string, member: Member): void {
    const groups = repository.getAll();
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    const updatedGroup = {
      ...group,
      members: [...group.members, member],
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
    navigateTo,
    createGroup,
    addExpense,
    removeGroup,
    updateGroup,
    addMember,
    removeMember,
  };
}
