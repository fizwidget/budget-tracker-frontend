declare const accountId: unique symbol;

export type AccountId = string & {
  [accountId]: true;
};

function assertAccountId(value: string): asserts value is AccountId {}

export function toAccountId(value: string): AccountId {
  assertAccountId(value);
  return value;
}

export interface Account {
  id: AccountId;
  name: string;
}
