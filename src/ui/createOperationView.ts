import { createTextField, createLabel } from './helpers/fields';
import type { Member, Expense, ExpenseSplit } from '../models/types';
import { buildEqualSplits } from '../domain/split';
import { toKopecks } from '../domain/money';

type CreateOperationViewHandlers = {
  onSubmit: (expense: Expense) => void;
  onCancel: () => void;
};

export function createOperationView(
  members: Member[],
  { onSubmit, onCancel }: CreateOperationViewHandlers,
) {
  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h1');
  heading.textContent = 'Новая операция';

  const form = document.createElement('form');
  form.className = 'create-operation-form';

  // --- Базовые поля ---
  const nameLabel = createLabel('Название операции', 'operation-name');
  const nameInput = createTextField('operation-name', 'Ужин в ресторане');

  const dateLabel = createLabel('Дата', 'operation-date');
  const dateInput = createTextField('operation-date', '25/11/2026');

  const payerSelect = document.createElement('select');
  payerSelect.id = 'payer-select';
  const payerLabel = createLabel('Кто платит', 'payer-select');

  members.forEach((member) => {
    const option = document.createElement('option');
    option.value = member.id;
    option.textContent = member.name;
    payerSelect.append(option);
  });

  const amountLabel = createLabel('Сумма', 'operation-amount');
  const amountInput = createTextField('operation-amount', '120');
  const currency = document.createElement('span');
  currency.textContent = ' руб';
  const amountWrapper = document.createElement('div');
  amountWrapper.append(amountInput, currency);

  // --- Секция разделения (За кого платит) ---
  const splitsTitle = document.createElement('h3');
  splitsTitle.textContent = 'За кого платит';

  const splitControls = document.createElement('div');
  const addSplitBtn = document.createElement('button');
  addSplitBtn.type = 'button';
  addSplitBtn.textContent = '+';

  const equalSplitBtn = document.createElement('button');
  equalSplitBtn.type = 'button';
  equalSplitBtn.textContent = 'Разделить на всех поровну';

  splitControls.append(addSplitBtn, equalSplitBtn);

  const splitsContainer = document.createElement('div');
  splitsContainer.className = 'splits-container';

  // Локальное состояние для строк разделения (UI-уровень)
  // потом вынести в отдельный стейт, но для вьюхи сойдет
  let currentSplits: { memberId: string; amount: string }[] = [];

  const renderSplits = () => {
    splitsContainer.replaceChildren(); // Очищаем

    currentSplits.forEach((split, index) => {
      const row = document.createElement('div');
      row.className = 'split-row';

      const select = document.createElement('select');
      members.forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.name;
        if (m.id === split.memberId) opt.selected = true;
        select.append(opt);
      });
      // Сохраняем выбор при изменении
      select.addEventListener('change', (e) => {
        currentSplits[index].memberId = (e.target as HTMLSelectElement).value;
      });

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Сумма';
      input.value = split.amount;
      // Сохраняем ввод
      input.addEventListener('input', (e) => {
        currentSplits[index].amount = (e.target as HTMLInputElement).value;
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.textContent = '❌';
      deleteBtn.addEventListener('click', () => {
        currentSplits = currentSplits.filter((_, i) => i !== index);
        renderSplits();
      });

      row.append(select, input, deleteBtn);
      splitsContainer.append(row);
    });
  };

  addSplitBtn.addEventListener('click', () => {
    if (members.length === 0) return;
    currentSplits.push({ memberId: members[0].id, amount: '' });
    renderSplits();
  });

  equalSplitBtn.addEventListener('click', () => {
    const totalKopecks = toKopecks(Number(amountInput.value));

    if (isNaN(totalKopecks) || totalKopecks <= 0) {
      return;
    }

    const splitsInKopecks = buildEqualSplits(
      totalKopecks,
      members.map((m) => m.id),
    );

    // копейки обратно в рубли для отображения в UI
    currentSplits = splitsInKopecks.map((s) => ({
      memberId: s.memberId,
      amount: (s.amount / 100).toString(),
    }));

    renderSplits();
  });

  // --- Комментарий ---
  const commentLabel = createLabel('Комментарий', 'operation-comment');
  const commentInput = document.createElement('textarea');
  commentInput.id = 'operation-comment';
  commentInput.rows = 3;

  // --- Кнопки управления ---
  const buttons = document.createElement('div');
  buttons.className = 'buttons-wrapper';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Добавить';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Отмена';
  cancelButton.addEventListener('click', onCancel);

  buttons.append(submitButton, cancelButton);

  // --- Сборка формы ---
  form.append(
    nameLabel,
    nameInput,
    dateLabel,
    dateInput,
    payerLabel,
    payerSelect,
    amountLabel,
    amountWrapper,
    splitsTitle,
    splitControls,
    splitsContainer,
    commentLabel,
    commentInput,
    buttons,
  );

  container.append(heading, form);

  // --- Отправка формы ---
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Переводим рубли в копейки
    const totalAmount = toKopecks(Number(amountInput.value));

    // Собираем сплиты, конвертируя их суммы в копейки
    const splits: ExpenseSplit[] = currentSplits.map((s) => ({
      memberId: s.memberId,
      amount: toKopecks(Number(s.amount)),
    }));

    // Валидация минимальная: если сумма не число или 0, не отправляем
    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert('Введите корректную сумму');
      return;
    }

    const expense: Expense = {
      id: crypto.randomUUID(),
      name: nameInput.value,
      date: dateInput.value,
      paidById: payerSelect.value,
      total: totalAmount,
      splits: splits,
      comment: commentInput.value,
    };

    onSubmit(expense);
  });

  return container;
}
