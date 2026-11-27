import { createGroupHeader } from './group/createGroupHeader';
import { createMembersSection } from './group/createMembersSection';
import { createBalancesSection } from './group/createBalancesSection';
import { createExpensesSection } from './group/createExpensesSection';
import { calculateSettlement } from '../domain/settlement';

import type { Group } from '../models/types';

type GroupViewHandlers = {
  onDelete: (groupId: string) => void;
  onBack: () => void;
  onAddMember: () => void;
  onEditMember: (memberId: string) => void;
  onDeleteMember: (memberId: string) => void;
  onRename: () => void;
  onAddOperation: () => void;
  onDeleteOperation: (expenseId: string) => void;
};

export function groupView(
  group: Group,
  {
    onDelete,
    onBack,
    onAddMember,
    onEditMember,
    onDeleteMember,
    onRename,
    onAddOperation,
    onDeleteOperation,
  }: GroupViewHandlers,
) {
  const container = document.createElement('div');
  container.className = 'container';

  container.append(
    createGroupHeader(group, { onDelete, onBack, onRename }),
    createMembersSection(group.members, { onAddMember, onEditMember, onDeleteMember }),
    createBalancesSection(group, calculateSettlement(group)),
    createExpensesSection(group, { onAddOperation, onDeleteOperation }),
  );
  return container;
}
