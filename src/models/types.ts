export interface Member {
  id: string;
  name: string;
}

export interface ExpenseSplit {
  memberId: string;
  amount: number;
}

export interface Expense {
  id: string;
  name: string;
  date: string;
  paidById: string;
  total: number;
  splits: ExpenseSplit[];
  comment?: string;
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
}

export interface Transfer {
  fromMemberId: string;
  toMemberId: string;
  amount: number;
}

export interface AppState {
  groups: Group[];
  activeGroupId: string | null;
}
