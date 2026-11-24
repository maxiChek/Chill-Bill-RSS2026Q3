import { groupsView } from './ui/groupsView';
import { createGroupView } from './ui/createGroupView';
import { createOperationView } from './ui/createOperationView';
import type { Group } from './models/types';
import './style.css';

// Временные моковые данные для проверки рендеринга
let groups: Group[] = [
  {
    id: crypto.randomUUID(),
    name: 'Поездка в Щучинщину',
    members: [
      { id: crypto.randomUUID(), name: 'Петя' },
      { id: crypto.randomUUID(), name: 'Вася' },
      { id: crypto.randomUUID(), name: 'Коля' },
    ],
    expenses: [],
  },
  {
    id: crypto.randomUUID(),
    name: 'Ужин в ресторане',
    members: [
      { id: crypto.randomUUID(), name: 'Петя' },
      { id: crypto.randomUUID(), name: 'Жанна' },
      { id: crypto.randomUUID(), name: 'Игорь' },
    ],
    expenses: [],
  },
];

const app = document.createElement('div');
document.body.append(app);
app.id = 'app';

const showGroups = () => {
  app.replaceChildren(groupsView(groups, groupsViewHandlers));
};

const showCreateGroup = () => {
  app.replaceChildren(
    createGroupView({
      onSubmit: (group) => {
        groups = [...groups, group];
        showGroups();
      },
      onCancel: showGroups,
    }),
  );
};

const showCreateOperation = (groupId: string) => {
  const group = groups.find((g) => g.id === groupId);
  if (!group) return;

  app.replaceChildren(
    createOperationView(group.members, {
      onSubmit: (expense) => {
        // --- Заглушка ---
        group.expenses.push(expense);
        alert(`Операция "${expense.name}" на сумму ${expense.total / 100} руб. добавлена!`);

        showGroups();
      },
      onCancel: showGroups,
    }),
  );
};

const groupsViewHandlers = {
  onOpen: (groupId: string) => showCreateOperation(groupId),
  onCreate: showCreateGroup,
};

showGroups();
