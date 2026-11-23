import type { Group } from '../models/types';

type GroupsViewHandlers = {
  onOpen: (groupId: string) => void;
  onCreate: () => void;
};

export function groupsView(groups: Group[], { onOpen, onCreate }: GroupsViewHandlers) {
  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h1');
  heading.textContent = 'Группы';

  const createGroupButton = document.createElement('button');
  createGroupButton.textContent = 'Новая группа';
  createGroupButton.addEventListener('click', onCreate);

  const groupsList = document.createElement('ul');
  groupsList.className = 'groups-list';

  const createGroupItem = (group: Group) => {
    const item = document.createElement('li');

    const groupButton = document.createElement('button');
    groupButton.type = 'button';

    groupButton.addEventListener('click', () => onOpen(group.id));

    const title = document.createElement('span');
    title.textContent = group.name;

    const members = document.createElement('span');
    members.textContent = `Участников: ${group.members.length}`;

    groupButton.append(title, members);
    item.append(groupButton);

    return item;
  };

  const groupsListItems = groups.map(createGroupItem);
  groupsList.append(...groupsListItems);

  container.append(heading, createGroupButton, groupsList);

  return container;
}
