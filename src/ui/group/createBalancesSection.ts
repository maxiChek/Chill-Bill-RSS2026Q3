import type { Group, Transfer } from '../../models/types';
import { getMemberName } from '../helpers/members';

export function createBalancesSection(group: Group, transfers: Transfer[]) {
  const balancesSection = document.createElement('section');
  balancesSection.className = 'balances-section';

  const balancesHeading = document.createElement('h2');
  balancesHeading.textContent = 'Баланс';

  const balancesWrapper = document.createElement('div');
  balancesWrapper.className = 'balances-wrapper';

  const balancesElements = transfers.map((t) => {
    const balanceItem = document.createElement('p');
    const debtorName = getMemberName(group.members, t.fromMemberId);
    const lenderName = getMemberName(group.members, t.toMemberId);
    balanceItem.textContent = `${debtorName} → ${lenderName} ${t.amount} рублей`;
    return balanceItem;
  });

  balancesWrapper.append(...balancesElements);
  balancesSection.append(balancesHeading, balancesWrapper);

  return balancesSection;
}
