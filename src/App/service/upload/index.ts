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

  // Cache update!
  // ...actually, shouldn't Apollo be able to figure that out for itself?
  // It doesn't seem to at the moment, weird.
  const runMutation = ({ transactionsCsv }: Input) =>
    mutate({
      variables: {
        input: {
          csv: transactionsCsv,
        },
      },
      update: (proxy, mutationResult) => {
        // This works for now but it's kinda dodgy - the variables
        // shouldn't be hardcoded. How can I use the most recent variables?
        const previousTransactions = proxy.readQuery<
          GetTransactions,
          GetTransactionsVariables
        >({
          query: TRANSACTIONS_QUERY,
          variables: {
            filter: {
              categories: [],
            },
          },
        })?.transactions;
        const newTransactions =
          mutationResult.data?.recordTransactions?.transactions;
        if (previousTransactions == null || newTransactions == null) {
          return;
        }
        proxy.writeQuery<GetTransactions, GetTransactionsVariables>({
          query: TRANSACTIONS_QUERY,
          variables: {
            filter: {
              categories: [],
            },
          },
          data: { transactions: [...previousTransactions, ...newTransactions] },
        });
      },
    });

  return [runMutation, transformResult(result)];
};
