import { createGroupHeader } from './group/createGroupHeader';
import { createMembersSection } from './group/createMembersSection';
import { createBalancesSection } from './group/createBalancesSection';
import { createExpensesSection } from './group/createExpensesSection';

import type { Group, Transfer } from '../models/types';

type GroupViewHandlers = {
  onDelete: (groupId: string) => void;
  onBack: () => void;
  onAddMember: () => void;
  onDeleteMember: () => void;
};

export function groupView(
  group: Group,
  { onDelete, onBack, onAddMember, onDeleteMember }: GroupViewHandlers,
) {
  // Это временные моковые данные
  const tempTransfers: Transfer[] = [
    {
      fromMemberId: group.members[0].id,
      toMemberId: group.members[1].id,
      amount: 1000,
    },
    {
      fromMemberId: group.members[1].id,
      toMemberId: group.members[2].id,
      amount: 500,
    },
  ];

  const container = document.createElement('div');
  container.className = 'container';

  container.append(
    createGroupHeader(group, { onDelete, onBack }),
    createMembersSection(group, { onAddMember, onDeleteMember }),
    createBalancesSection(group, tempTransfers),
    createExpensesSection(group),
  );
  return container;
}
