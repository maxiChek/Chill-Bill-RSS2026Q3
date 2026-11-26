import type { Group, Transfer } from '../models/types';
import { calculateBalances } from './balances';

export function calculateSettlement(group: Group): Transfer[] {
  const balances = calculateBalances(group);

  const sortedBalances = [...balances]
    .map(([id, amount]) => ({ id, amount }))
    .sort((a, b) => a.amount - b.amount);
  const debtors = sortedBalances
    .filter((b) => b.amount < 0)
    .map((b) => ({ id: b.id, amount: b.amount * -1 }));
  const creditors = sortedBalances.filter((b) => b.amount > 0).reverse();

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    transfers.push({
      fromMemberId: debtors[i].id,
      toMemberId: creditors[j].id,
      amount,
    });

    debtors[i].amount -= amount;
    creditors[j].amount -= amount;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return transfers;
}
