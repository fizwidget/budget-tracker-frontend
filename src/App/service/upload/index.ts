import { ServiceMutationResult } from "../../common/types/service-result";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_TRANSACTIONS } from "./gql";
import {
  UploadTransactionsVariables,
  UploadTransactions,
} from "./__generated__/UploadTransactions";
import { transformResult } from "./utils";

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
    });

  return [runMutation, transformResult(result)];
};
