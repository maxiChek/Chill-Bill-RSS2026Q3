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

const groupsViewHandlers = {
  onOpen: (groupId: string) => void groupId,
  onCreate: showCreateGroup,
};

showGroups();
