import type { Group } from '../../models/types';
import { formatMoney } from '../../domain/money';
import { getMemberName } from '../helpers/members';
import { appendOrEmpty } from '../helpers/list';

// тип для обработчиков
type ExpensesSectionHandlers = {
  onAddOperation: () => void;
  onDeleteOperation: (expenseId: string) => void;
};

export function createExpensesSection(
  group: Group,
  { onAddOperation, onDeleteOperation }: ExpensesSectionHandlers,
) {
  const expensesSection = document.createElement('section');
  expensesSection.className = 'expenses-section';

  const expensesHeading = document.createElement('h2');
  expensesHeading.textContent = 'Операции';

  const addOperationButton = document.createElement('button');
  addOperationButton.type = 'button';
  addOperationButton.textContent = '➕';
  // навешиваем клик на кнопку
  addOperationButton.addEventListener('click', onAddOperation);

  const expensesWrapper = document.createElement('div');
  expensesWrapper.className = 'expenses-wrapper';

  const expensesElements = group.expenses.map((e) => {
    const expense = document.createElement('div');
    expense.className = 'expense';

    const expenseTitle = document.createElement('span');
    expenseTitle.textContent = `${e.name} / ${e.date}`;

    const editExpenseButton = document.createElement('button');
    editExpenseButton.type = 'button';
    editExpenseButton.textContent = '✏️';

    const deleteExpenseButton = document.createElement('button');
    deleteExpenseButton.type = 'button';
    deleteExpenseButton.textContent = '❌';
    deleteExpenseButton.addEventListener('click', () => onDeleteOperation(e.id));

    const expenseTotal = document.createElement('p');
    expenseTotal.textContent = formatMoney(e.total);

    const expensePayer = document.createElement('p');
    expensePayer.textContent = `Оплатил: ${getMemberName(group.members, e.paidById)}`;

    const expenseDebtors = document.createElement('p');
    expenseDebtors.textContent = `Должники: ${e.splits
      .map((split) => {
        const debtor = getMemberName(group.members, split.memberId);
        if (!debtor) return;
        return `${debtor} (${formatMoney(split.amount)})`;
      })
      .join(', ')}`;

    expense.append(
      expenseTitle,
      editExpenseButton,
      deleteExpenseButton,
      expenseTotal,
      expensePayer,
      expenseDebtors,
    );
    return expense;
  });

  appendOrEmpty(expensesWrapper, expensesElements, 'Пока никто ни за что не платил.');

  expensesSection.append(expensesHeading, addOperationButton, expensesWrapper);
  return expensesSection;
}
