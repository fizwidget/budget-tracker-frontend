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
} from "./__generated__/GetTransactions";
import { toDollars } from "../../common/types/dollars";

const transformTransaction = (
  input: GetTransactions_transactions
): Transaction => {
  return {
    id: toTransactionId(input.id),
    description: input.description,
    amount: toDollars(input.amount),
    date: new Date(input.date),
    account: transformAccount(),
    category: transformCategory(),
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
  if (result.data?.transactions)
    return successResult(result.data?.transactions?.map(transformResult));
};
