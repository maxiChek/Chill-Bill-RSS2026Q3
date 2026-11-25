import type { Group } from '../../models/types';

type GroupMembersSectionHandlers = {
  onAddMember: () => void;
  onDeleteMember: (memberId: string) => void;
};

export function createMembersSection(
  group: Group,
  { onAddMember, onDeleteMember }: GroupMembersSectionHandlers,
) {
  const membersSection = document.createElement('section');
  membersSection.className = 'members-section';

  const memberHeading = document.createElement('h2');
  memberHeading.textContent = 'Участники';

  const membersElements = group.members.map((m) => {
    const memberWrapper = document.createElement('div');
    memberWrapper.className = 'member-wrapper';

    const memberName = document.createElement('span');
    memberName.textContent = m.name;

    const deleteMemberButton = document.createElement('button');
    deleteMemberButton.type = 'button';
    deleteMemberButton.textContent = '❌';
    deleteMemberButton.addEventListener('click', () => onDeleteMember(m.id));

    memberWrapper.append(memberName, deleteMemberButton);
    return memberWrapper;
  });

  const membersWrapper = document.createElement('div');
  membersWrapper.className = 'members-wrapper';
  membersWrapper.replaceChildren(...membersElements);

  const addMemberButton = document.createElement('button');
  addMemberButton.type = 'button';
  addMemberButton.textContent = '➕';
  addMemberButton.addEventListener('click', () => onAddMember());

  membersSection.append(memberHeading, addMemberButton, membersWrapper);

  return membersSection;
}
