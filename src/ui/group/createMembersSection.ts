import type { Member } from '../../models/types';
import { appendOrEmpty } from '../helpers/list';

type MembersSectionHandlers = {
  onAddMember: () => void;
  onEditMember: (memberId: string) => void;
  onDeleteMember: (memberId: string) => void;
};

export function createMembersSection(
  members: Member[],
  { onAddMember, onEditMember, onDeleteMember }: MembersSectionHandlers,
) {
  const membersSection = document.createElement('section');
  membersSection.className = 'members-section';

  const memberHeading = document.createElement('h2');
  memberHeading.textContent = 'Участники';

  const membersElements = members.map((m) => {
    const memberWrapper = document.createElement('div');
    memberWrapper.className = 'member-wrapper';

    const memberName = document.createElement('span');
    memberName.textContent = m.name;

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'member-buttons';

    const editMemberButton = document.createElement('button');
    editMemberButton.type = 'button';
    editMemberButton.textContent = '✏️';
    editMemberButton.addEventListener('click', () => onEditMember(m.id));

    const deleteMemberButton = document.createElement('button');
    deleteMemberButton.type = 'button';
    deleteMemberButton.textContent = '❌';
    deleteMemberButton.addEventListener('click', () => onDeleteMember(m.id));

    buttonsWrapper.append(editMemberButton, deleteMemberButton);
    memberWrapper.append(memberName, buttonsWrapper);
    return memberWrapper;
  });

  const membersWrapper = document.createElement('div');
  membersWrapper.className = 'members-wrapper';
  appendOrEmpty(membersWrapper, membersElements, 'В этой группе пока нет участников');

  const addMemberButton = document.createElement('button');
  addMemberButton.type = 'button';
  addMemberButton.textContent = '➕';
  addMemberButton.addEventListener('click', () => onAddMember());

  membersSection.append(memberHeading, addMemberButton, membersWrapper);

  return membersSection;
}
