import { ServiceMutationResult } from "../../common/types/service-result";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_TRANSACTIONS } from "./gql";
import {
  UploadTransactionsVariables,
  UploadTransactions,
} from "./__generated__/UploadTransactions";
import { transformResult } from "./utils";
import { TRANSACTIONS_QUERY } from "../transactions/gql";
import {
  GetTransactions,
  GetTransactionsVariables,
} from "../transactions/__generated__/GetTransactions";

interface Input {
  transactionsCsv: string;
}

export const useUpload = (): ServiceMutationResult<Input, void> => {
  const [mutate, result] = useMutation<
    UploadTransactions,
    UploadTransactionsVariables
  >(UPLOAD_TRANSACTIONS);

  const runMutation = ({ transactionsCsv }: Input) =>
    mutate({
      variables: {
        input: {
          csv: transactionsCsv,
        },
      },
      update: (proxy, mutationResult) => {
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

          const combinedTransactions = [
            ...previousTransactions,
            ...newTransactions,
          ];

          proxy.writeQuery<GetTransactions, GetTransactionsVariables>({
            query: TRANSACTIONS_QUERY,
            variables,
            data: {
              transactions: combinedTransactions,
            },
          });
        });
      },
    });

  return [runMutation, transformResult(result)];
};
