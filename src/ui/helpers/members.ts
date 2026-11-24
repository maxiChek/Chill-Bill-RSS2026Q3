import type { Member } from '../../models/types';

export function getMemberName(members: Member[], id: string): string {
  return members.find((m) => m.id === id)?.name ?? 'Неизвестный участник';
}
