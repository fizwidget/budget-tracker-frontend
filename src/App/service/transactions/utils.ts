import { QueryResult } from "@apollo/react-common";
import { Transaction, toTransactionId } from "../../common/types/transaction";
import {
  ServiceQueryResult,
  loadingResult,
  errorResult,
  successResult,
} from "../../common/types/service-result";
import {
  GetTransactions,
  GetTransactions_transactions,
  GetTransactions_transactions_account,
  GetTransactions_transactions_category,
} from "./__generated__/GetTransactions";
import { toDollars } from "../../common/types/dollars";
import { Account, toAccountId } from "../../common/types/account";
import { Category, toCategoryId } from "../../common/types/category";

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

const transformTransaction = (
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
    return loadingResult();
  }
  if (result.error) {
    return errorResult(result.error);
  }
  if (!result.data?.transactions) {
    return errorResult(Error("Missing transactions"));
  }
  return successResult(result.data?.transactions?.map(transformTransaction));
};