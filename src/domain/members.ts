import type { Group, Member } from '../models/types';

export function isMemberInUse(group: Group, memberId: string): boolean {
  return group.expenses.some(
    (expense) =>
      expense.paidById === memberId || expense.splits.some((split) => split.memberId === memberId),
  );
}

export function isNameUsed(members: Member[], name: string, exceptMemberId?: string): boolean {
  return members.some((m) => m.id !== exceptMemberId && m.name === name);
}
