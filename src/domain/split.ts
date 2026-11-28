import type { ExpenseSplit } from '../models/types';

export function buildEqualSplits(total: number, memberIds: string[]): ExpenseSplit[] {
  if (memberIds.length === 0) return [];

  const baseShare = Math.floor(total / memberIds.length);

  const remainder = total % memberIds.length;

  return memberIds.map((memberId, index) => {
    const amount = baseShare + (index < remainder ? 1 : 0);

    return { memberId, amount };
  });
}
