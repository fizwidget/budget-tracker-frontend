import { useMutation } from "@apollo/client";

import { ServiceMutationResult } from "../../types/service-result";
import { UPLOAD_TRANSACTIONS } from "./gql";
import {
  UploadTransactionsVariables,
  UploadTransactions,
} from "./__generated__/UploadTransactions";
import { transformResult, updateCache } from "./utils";

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
      update: updateCache,
    });

  return [runMutation, transformResult(result)];
};
