import type { Group } from '../models/types';

export function isMemberInUse(group: Group, memberId: string): boolean {
  return group.expenses.some(
    (expense) =>
      expense.paidById === memberId || expense.splits.some((split) => split.memberId === memberId),
  );
}
