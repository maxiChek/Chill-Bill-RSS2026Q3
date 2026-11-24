import type { Group, Transfer } from '../models/types';

type GroupViewHandlers = {
  onDelete: (groupId: string) => void;
  onBack: () => void;
  onAddMember: () => void;
  onDeleteMember: () => void;
};

export function groupView(group: Group, { onDelete, onBack, onAddMember }: GroupViewHandlers) {
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

  const title = document.createElement('h1');
  title.textContent = group.name;

  const editNameButton = document.createElement('button');
  editNameButton.type = 'button';
  editNameButton.textContent = '✏️';

  const deleteGroupButton = document.createElement('button');
  deleteGroupButton.type = 'button';
  deleteGroupButton.textContent = 'Удалить группу';
  deleteGroupButton.addEventListener('click', () => onDelete(group.id));

  const returnButton = document.createElement('button');
  returnButton.type = 'button';
  returnButton.textContent = 'Вернуться';
  returnButton.addEventListener('click', onBack);

  const membersSection = document.createElement('div');
  membersSection.className = 'members-section';

  const memberHeading = document.createElement('h2');
  memberHeading.textContent = 'Участники';

  const membersElements = group.members.map((m) => {
    const memberWrapper = document.createElement('div');
    memberWrapper.className = 'member-wrapper';

    const memberName = document.createElement('span');
    memberName.textContent = m.name;

    const deleteMemberButton = document.createElement('button');
    deleteMemberButton.type = 'button';
    deleteMemberButton.textContent = '❌';

    memberWrapper.append(memberName, deleteMemberButton);
    return memberWrapper;
  });

  const membersWrapper = document.createElement('div');
  membersWrapper.className = 'members-wrapper';
  membersWrapper.replaceChildren(...membersElements);

  const addMemberButton = document.createElement('button');
  addMemberButton.type = 'button';
  addMemberButton.textContent = '➕';
  addMemberButton.addEventListener('click', () => onAddMember());

  membersSection.append(memberHeading, addMemberButton, membersWrapper);

  const balancesSection = document.createElement('div');
  balancesSection.className = 'balances-section';

  const balancesHeading = document.createElement('h2');
  balancesHeading.textContent = 'Баланс';

  const balancesWrapper = document.createElement('div');
  balancesWrapper.className = 'balances-wrapper';

  const balancesElements = tempTransfers.map((t) => {
    const balanceItem = document.createElement('p');
    const debtorName = group.members.find((m) => m.id === t.fromMemberId)?.name;
    const lenderName = group.members.find((m) => m.id === t.toMemberId)?.name;
    balanceItem.textContent = `${debtorName} → ${lenderName} ${t.amount} рублей`;
    return balanceItem;
  });

  balancesWrapper.append(...balancesElements);
  balancesSection.append(balancesHeading, balancesWrapper);

  const expensesSection = document.createElement('div');
  expensesSection.className = 'expenses-section';

  const expensesHeading = document.createElement('h2');
  expensesHeading.textContent = 'Операции';

  const addOperationButton = document.createElement('button');
  addOperationButton.type = 'button';
  addOperationButton.textContent = '➕';

  const expensesWrapper = document.createElement('div');
  expensesWrapper.className = 'expenses-wrapper';

  const expensesElements = group.expenses.map((e) => {
    const expense = document.createElement('div');
    expense.className = 'expense';

    const expenseName = document.createElement('span');
    expenseName.textContent = e.name;

    const editExpenseButton = document.createElement('button');
    editExpenseButton.type = 'button';
    editExpenseButton.textContent = '✏️';

    const deleteExpenseButton = document.createElement('button');
    deleteExpenseButton.type = 'button';
    deleteExpenseButton.textContent = '❌';

    const expenseTotal = document.createElement('p');
    expenseTotal.textContent = `${e.total} руб`;

    const expensePayer = document.createElement('p');
    expensePayer.textContent = `Оплатил: ${group.members.find((m) => m.id === e.paidById)?.name}`;

    const expenseDebtors = document.createElement('p');
    expenseDebtors.textContent = `Должники: ${e.splits
      .map((split) => {
        const debtor = group.members.find((m) => m.id === split.memberId);
        if (!debtor) return;
        return `${debtor.name} (${split.amount} руб)`;
      })
      .join(', ')}`;

    expense.append(
      expenseName,
      editExpenseButton,
      deleteExpenseButton,
      expenseTotal,
      expensePayer,
      expenseDebtors,
    );
    return expense;
  });

  expensesWrapper.append(...expensesElements);

  expensesSection.append(expensesHeading, addOperationButton, expensesWrapper);

  container.append(
    title,
    editNameButton,
    deleteGroupButton,
    returnButton,
    membersSection,
    balancesSection,
    expensesSection,
  );
  return container;
}
