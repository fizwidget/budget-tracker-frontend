import { Dollars } from "./dollars";
import { Category } from "./category";
import { Account } from "./account";

declare const transactionId: unique symbol;

export type TransactionId = string & {
  [transactionId]: true;
};

function assertTransactionId(value: string): asserts value is TransactionId {
  if (value.length === 0) {
    throw Error("Transaction ID cannot be empty");
  }
}

export const toTransactionId = (value: string): TransactionId => {
  assertTransactionId(value);
  return value;
};

export interface Transaction {
  id: TransactionId;
  description: string;
  date: Date;
  amount: Dollars;
  account: Account;
  category: { tag: "categorised"; value: Category } | { tag: "uncategorised" };
}
