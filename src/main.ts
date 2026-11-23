import { groupsView } from './ui/groupsView';
import { createGroupView } from './ui/createGroupView';
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

const groupsViewHandlers = {
  onOpen: (groupId: string) => void groupId,
  onCreate: () =>
    app.replaceChildren(
      createGroupView({
        onSubmit: (group) => {
          groups = [...groups, group];
          app.replaceChildren(groupsView(groups, groupsViewHandlers));
        },
        onCancel: () => app.replaceChildren(groupsView(groups, groupsViewHandlers)),
      }),
    ),
};

app.append(groupsView(groups, groupsViewHandlers));
