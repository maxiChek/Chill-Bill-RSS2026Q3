import { createTextField, createLabel } from './helpers/fields';
import { createMembersSection } from './group/createMembersSection';
import { openAddMemberDialog, openEditMemberDialog } from './group/memberNameDialog';
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
  const nameInput = createTextField('group-name', 'Ужин в ресторане');
  nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));

  const membersContainer = document.createElement('div');

  const renderMembers = () => {
    membersContainer.replaceChildren(
      createMembersSection(members, {
        onAddMember: async () => {
          const name = await openAddMemberDialog(members);
          if (!name) return;

          members = [...members, { id: crypto.randomUUID(), name }];
          renderMembers();
        },
        onEditMember: async (memberId) => {
          const member = members.find((m) => m.id === memberId);
          if (!member) return;

          const name = await openEditMemberDialog(members, member);
          if (!name || name === member.name) return;

          members = members.map((m) => (m.id === memberId ? { ...m, name } : m));
          renderMembers();
        },
        onDeleteMember: (memberId) => {
          members = members.filter((m) => m.id !== memberId);
          renderMembers();
        },
      }),
    );
  };
  renderMembers();

  const buttons = document.createElement('div');
  buttons.className = 'buttons-wrapper';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Создать';

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Отмена';

  buttons.append(submitButton, cancelButton);

  form.append(nameLabel, nameInput, membersContainer, buttons);

  container.append(heading, form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    if (name === '') {
      nameInput.setCustomValidity('Укажите название группы');
      nameInput.reportValidity();
      return;
    }

    onSubmit({ id: crypto.randomUUID(), name, members, expenses: [] });
  });

  cancelButton.addEventListener('click', onCancel);

  return container;
}
