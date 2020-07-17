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

export const updateCache = (
  proxy: DataProxy,
  mutationResult: FetchResult<UploadTransactions>
) => {
  debugger;

  // The new transactions should be returned if:
  // - We query for *all* transactions.
  // - We query for uncategorised transactions (null).
  const queryVariables: GetTransactionsVariables[] = [
    { filter: { categories: [null] } },
    { filter: {} },
  ];

  const newTransactions = mutationResult.data?.recordTransactions?.transactions;

  if (newTransactions == null) {
    return;
  }

  queryVariables.forEach((variables) => {
    let previousResult = null;
    try {
      previousResult = proxy.readQuery<
        GetTransactions,
        GetTransactionsVariables
      >({
        query: TRANSACTIONS_QUERY,
        variables,
      });
    } catch (error) {
      // Not in cache
      return;
    }

    const previousTransactions = previousResult?.transactions;

    if (previousTransactions == null) {
      return;
    }

    // TODO: Remove duplicate elimination when server only returns new transactions.
    const combinedTransactions = Array.from(
      new Map(
        [...previousTransactions, ...newTransactions].map((transaction) => [
          transaction.id,
          transaction,
        ])
      ).values()
    );

    proxy.writeQuery<GetTransactions, GetTransactionsVariables>({
      query: TRANSACTIONS_QUERY,
      variables,
      data: {
        transactions: combinedTransactions,
      },
    });
  });
};
