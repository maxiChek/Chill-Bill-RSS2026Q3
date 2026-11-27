import { store } from './state/store';
import { createActions } from './state/actions';
import { LocalStorageGroupRepository } from './repositories/LocalStorageGroupRepository';

import { groupsView } from './ui/groupsView';
import { groupView } from './ui/groupView';
import { createGroupView } from './ui/createGroupView';
import { createOperationView } from './ui/createOperationView';
import { openTextDialog, openConfirmDialog } from './ui/helpers/dialog';

import { MOCK_DATA } from './mocks/mockData';
import './style.css';

const repository = new LocalStorageGroupRepository();
const actions = createActions(repository);

const app = document.createElement('div');
app.id = 'app';
document.body.append(app);

// Router in-memory
function render() {
  const state = store.getState();
  app.replaceChildren();

  switch (state.currentScreen) {
    case 'groups':
      app.append(
        groupsView(state.groups, {
          onLoadDemo: () => actions.seedGroups(MOCK_DATA),
          onOpen: (groupId) => actions.navigateTo('group-details', groupId),
          onCreate: () => actions.navigateTo('create-group'),
        }),
      );
      break;

    case 'create-group':
      app.append(
        createGroupView({
          onSubmit: (newGroup) => actions.createGroup(newGroup),
          onCancel: () => actions.navigateTo('groups'),
        }),
      );
      break;

    case 'group-details': {
      const activeGroup = state.groups.find((g) => g.id === state.activeGroupId);
      if (!activeGroup) {
        actions.navigateTo('groups');
        return;
      }

      app.append(
        groupView(activeGroup, {
          onBack: () => actions.navigateTo('groups'),
          onAddOperation: () => actions.navigateTo('create-operation', activeGroup.id),

          onDelete: async (id) => {
            const confirmed = await openConfirmDialog({
              title: 'Удалить группу?',
              text: 'Это действие нельзя отменить.',
              submitLabel: 'Удалить',
            });
            if (confirmed) actions.removeGroup(id);
          },

          onRename: async () => {
            const name = await openTextDialog({
              title: 'Переименовать группу',
              label: 'Новое название',
              value: activeGroup.name,
            });
            if (name && name !== activeGroup.name) {
              actions.updateGroup({ ...activeGroup, name });
            }
          },

          onAddMember: async () => {
            const name = await openTextDialog({
              title: 'Добавить участника',
              label: 'Имя участника',
            });
            if (name) {
              actions.addMember(activeGroup.id, name);
            }
          },

          onDeleteMember: async (memberId) => {
            const confirmed = await openConfirmDialog({
              title: 'Удалить участника?',
              text: 'Вы уверены, что хотите удалить этого участника?',
            });
            if (confirmed) actions.removeMember(activeGroup.id, memberId);
          },
        }),
      );
      break;
    }

    case 'create-operation': {
      const activeGroup = state.groups.find((g) => g.id === state.activeGroupId);
      if (!activeGroup) {
        actions.navigateTo('groups');
        return;
      }

      app.append(
        createOperationView(activeGroup.members, {
          onSubmit: (expense) => actions.addExpense(activeGroup.id, expense),
          onCancel: () => actions.navigateTo('group-details', activeGroup.id),
        }),
      );
      break;
    }
  }
}

store.subscribe(render);
actions.loadGroups();
