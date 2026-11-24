import { groupsView } from './ui/groupsView';
import { groupView } from './ui/groupView';
import { createGroupView } from './ui/createGroupView';
import type { Group } from './models/types';
import './style.css';

// Временные моковые данные для проверки рендеринга
let groups: Group[] = [
  {
    id: 'group1',
    name: 'Поездка в Щучинщину',
    members: [
      { id: 'member11', name: 'Петя' },
      { id: 'member12', name: 'Вася' },
      { id: 'member13', name: 'Коля' },
    ],
    expenses: [
      {
        id: 'exp11',
        name: 'Аренда машины',
        date: '12.10.2026',
        paidById: 'member11',
        total: 99,
        splits: [
          {
            memberId: 'member11',
            amount: 33,
          },
          {
            memberId: 'member12',
            amount: 33,
          },
          {
            memberId: 'member13',
            amount: 33,
          },
        ],
        comment: 'Машина хорошая',
      },
      {
        id: 'exp12',
        name: 'Обед',
        date: '12.10.2026',
        paidById: 'member12',
        total: 100,
        splits: [
          {
            memberId: 'member11',
            amount: 30,
          },
          {
            memberId: 'member12',
            amount: 30,
          },
          {
            memberId: 'member13',
            amount: 40,
          },
        ],
        comment: 'Бензин дорогой',
      },
    ],
  },
  {
    id: 'group2',
    name: 'Ужин в ресторане',
    members: [
      { id: 'member21', name: 'Петя' },
      { id: 'member22', name: 'Жанна' },
      { id: 'member23', name: 'Игорь' },
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
        showGroup(group);
      },
      onCancel: showGroups,
    }),
  );
};

const showGroup = (group: Group) => {
  const updateGroup = (updated: Group) => {
    groups = groups.map((g) => (g.id === updated.id ? updated : g));
    showGroup(updated);
  };

  app.replaceChildren(
    groupView(group, {
      onDelete: (groupId) => {
        groups = groups.filter((g) => g.id !== groupId);
        showGroups();
      },
      onBack: () => showGroups(),
      onRename: () => {
        // TODO: заменить prompt на форму переименования группы
        const name = prompt('Новое название группы', group.name)?.trim();
        if (!name || name === group.name) return;

        updateGroup({ ...group, name });
      },
      onAddMember: () => {
        // TODO: заменить prompt на форму добавления участника
        const name = prompt('Имя участника')?.trim();
        if (!name) return;

        updateGroup({
          ...group,
          members: [...group.members, { id: crypto.randomUUID(), name }],
        });
      },
      onDeleteMember: (memberId) => {
        // TODO: нужна проверка на участие удаляемого в операциях
        updateGroup({
          ...group,
          members: group.members.filter((m) => m.id !== memberId),
        });
      },
    }),
  );
};

const groupsViewHandlers = {
  onOpen: (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (group) return showGroup(group);
  },
  onCreate: showCreateGroup,
};

showGroups();
