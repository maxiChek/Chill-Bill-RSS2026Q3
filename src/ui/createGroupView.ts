import { createTextField, createLabel } from './helpers/fields';
import type { Member, Group } from '../models/types';

type CreateGroupViewHandlers = {
  onSubmit: (group: Group) => void;
  onCancel: () => void;
};

export function createGroupView({ onSubmit, onCancel }: CreateGroupViewHandlers) {
  let members: Member[] = [];

  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h1');
  heading.textContent = 'Создание новой группы';

  const form = document.createElement('form');
  form.className = 'create-group-form';

  const nameLabel = createLabel('Название группы', 'group-name');
  const nameInput = createTextField('group-name', 'group-name', 'Ужин в ресторане');

  const membersLabel = createLabel('Участники', 'member-name');
  const membersName = createTextField('member-name', 'member-name', 'Введите имя');
  const addMemberButton = document.createElement('button');
  addMemberButton.type = 'button';
  addMemberButton.textContent = 'Добавить';

  const membersWrapper = document.createElement('div');
  membersWrapper.className = 'members-wrapper';

  const renderMembers = () => {
    const membersElements = members.map((member) => {
      const memberWrapper = document.createElement('div');
      memberWrapper.className = 'member-wrapper';
      const memberName = document.createElement('span');
      memberName.textContent = member.name;
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = '❌';
      deleteButton.addEventListener('click', () => {
        members = members.filter((m) => member.id !== m.id);
        renderMembers();
      });
      memberWrapper.append(memberName, deleteButton);
      return memberWrapper;
    });

    membersWrapper.replaceChildren(...membersElements);
  };

  addMemberButton.addEventListener('click', () => {
    members = [
      ...members,
      {
        id: crypto.randomUUID(),
        name: membersName.value,
      },
    ];
    membersName.value = '';
    renderMembers();
  });

  const buttons = document.createElement('div');
  buttons.className = 'buttons-wrapper';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Создать';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Отмена';

  buttons.append(submitButton, cancelButton);

  form.append(
    nameLabel,
    nameInput,
    membersLabel,
    membersName,
    addMemberButton,
    membersWrapper,
    buttons,
  );

  container.appendChild(heading);
  container.appendChild(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      name: nameInput.value,
      members,
      expenses: [],
    });
  });

  cancelButton.addEventListener('click', onCancel);

  return container;
}
