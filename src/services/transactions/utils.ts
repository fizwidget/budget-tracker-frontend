import { QueryResult } from "@apollo/client";
import { Transaction, toTransactionId } from "../../types/transaction";
import {
  ServiceQueryResult,
  loading,
  failure,
  success,
} from "../../types/service-result";
import {
  GetTransactions,
  GetTransactions_transactions,
  GetTransactions_transactions_account,
  GetTransactions_transactions_category,
} from "./__generated__/GetTransactions";
import { toDollars } from "../../types/dollars";
import { Account, toAccountId } from "../../types/account";
import { Category, toCategoryId } from "../../types/category";

const transformAccount = (
  input: GetTransactions_transactions_account
): Account => ({
  id: toAccountId(input.id),
  name: input.name,
});

const transformCategory = (
  input: GetTransactions_transactions_category
): Category => ({
  id: toCategoryId(input.id),
  name: input.name,
});

export const transformTransaction = (
  input: GetTransactions_transactions
): Transaction => {
  if (input.account === null) {
    throw Error("Account missing");
  }

  return {
    id: toTransactionId(input.id),
    description: input.description,
    amount: toDollars(input.amount),
    date: new Date(input.date),
    account: transformAccount(input.account),
    category:
      input.category === null
        ? { tag: "uncategorised" }
        : { tag: "categorised", value: transformCategory(input.category) },
  };
};

export const transformResult = (
  result: QueryResult<GetTransactions>
): ServiceQueryResult<Transaction[]> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return failure(result.error);
  }
  if (!result.data?.transactions) {
    return failure(Error("Missing transactions"));
  }
  return success(result.data?.transactions?.map(transformTransaction));
};
