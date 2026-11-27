import type { Member } from '../../models/types';
import { openTextDialog } from '../helpers/dialog';
import { isNameUsed } from '../../domain/members';

const NAME_TAKEN_MESSAGE = 'Участник с таким именем уже есть, вы не сможете понять кто есть кто';

export function openAddMemberDialog(members: Member[]): Promise<string | null> {
  return openTextDialog({
    title: 'Добавить участника',
    label: 'Имя участника',
    validate: (name) => !isNameUsed(members, name),
    errorMessage: NAME_TAKEN_MESSAGE,
  });
}

export function openEditMemberDialog(members: Member[], member: Member): Promise<string | null> {
  return openTextDialog({
    title: 'Изменить имя участника',
    label: 'Имя участника',
    value: member.name,
    validate: (name) => !isNameUsed(members, name, member.id),
    errorMessage: NAME_TAKEN_MESSAGE,
  });
}
