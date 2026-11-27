import type { Group } from '../models/types';
export function calculateBalances(group: Group): Map<string, number> {
  const balances = new Map<string, number>();
  for (const m of group.members) balances.set(m.id, 0);

  for (const e of group.expenses) {
    balances.set(e.paidById, (balances.get(e.paidById) ?? 0) + e.total);
    for (const s of e.splits) {
      balances.set(s.memberId, (balances.get(s.memberId) ?? 0) - s.amount);
    }
  }

  return balances;
}
