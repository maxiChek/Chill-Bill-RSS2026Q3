import type { Group } from '../../models/types';

type GroupHeaderHandlers = {
  onDelete: (groupId: string) => void;
  onBack: () => void;
  onRename: () => void;
};

export function createGroupHeader(
  group: Group,
  { onDelete, onBack, onRename }: GroupHeaderHandlers,
) {
  const headerSection = document.createElement('section');

  const title = document.createElement('h1');
  title.textContent = group.name;

  const editNameButton = document.createElement('button');
  editNameButton.type = 'button';
  editNameButton.textContent = '✏️';
  editNameButton.addEventListener('click', onRename);

  const deleteGroupButton = document.createElement('button');
  deleteGroupButton.type = 'button';
  deleteGroupButton.textContent = 'Удалить группу';
  deleteGroupButton.addEventListener('click', () => onDelete(group.id));

  const returnButton = document.createElement('button');
  returnButton.type = 'button';
  returnButton.textContent = 'Вернуться';
  returnButton.addEventListener('click', onBack);

  headerSection.append(title, editNameButton, deleteGroupButton, returnButton);
  return headerSection;
}
