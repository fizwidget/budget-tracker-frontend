import { MutationResult } from "@apollo/react-common";
import { FetchResult } from "apollo-boost";
import { DataProxy } from "apollo-cache";
import {
  ServiceQueryResult,
  loading,
  failure,
  success,
} from "../../common/types/service-result";
import { UploadTransactions } from "./__generated__/UploadTransactions";
import {
  GetTransactions,
  GetTransactionsVariables,
} from "../transactions/__generated__/GetTransactions";
import { TRANSACTIONS_QUERY } from "../transactions/gql";

export const transformResult = (
  result: MutationResult<UploadTransactions>
): ServiceQueryResult<void> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return failure(result.error);
  }
  if (result.data?.recordTransactions?.success) {
    return success(undefined);
  }
  if (result.data === undefined) {
    return loading();
  }
  return failure(Error(result.data?.recordTransactions?.message));
};

export const updateCache = (proxy: DataProxy, mutationResult: FetchResult) => {
  // The new transactions should be returned if:
  // - We query for *all* transactions.
  // - We query for uncategorised transactions (null).
  const queryVariables: GetTransactionsVariables[] = [
    { filter: { categories: [null] } },
    { filter: {} },
  ];

  queryVariables.forEach((variables) => {
    const previousResult = proxy.readQuery<
      GetTransactions,
      GetTransactionsVariables
    >({
      query: TRANSACTIONS_QUERY,
      variables,
    });

    const previousTransactions = previousResult?.transactions;

    const newTransactions =
      mutationResult.data?.recordTransactions?.transactions;

    if (previousTransactions == null || newTransactions == null) {
      return;
    }

    const combinedTransactions = [...previousTransactions, ...newTransactions];

    proxy.writeQuery<GetTransactions, GetTransactionsVariables>({
      query: TRANSACTIONS_QUERY,
      variables,
      data: {
        transactions: combinedTransactions,
      },
    });
  });
};
