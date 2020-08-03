import { ServiceMutationResult } from "../../types/service-result";
import { CategoryId } from "../../types/category";
import { TransactionId } from "../../types/transaction";
import { useMutation } from "@apollo/client";
import { CATEGORISE_TRANSACTION_MUTATION } from "./gql";
import {
  CategoriseTransaction,
  CategoriseTransactionVariables,
} from "./__generated__/CategoriseTransaction";
import { transformResult } from "./utils";

interface Input {
  transactionId: TransactionId;
  categoryId: CategoryId | null;
}

export const useCategoriseTransaction = (): ServiceMutationResult<
  Input,
  void
> => {
  const [mutate, result] = useMutation<
    CategoriseTransaction,
    CategoriseTransactionVariables
  >(CATEGORISE_TRANSACTION_MUTATION);

  const runMutation = ({ categoryId, transactionId }: Input) => {
    mutate({
      variables: {
        input: {
          categoryId,
          transactionId,
        },
      },
      // TODO: Update cache! Need to insert this transaction into the
      // list of transactions for the category. And remove it from the
      // old list? Sounds complicated - re-run whole query instead?
    });
  };

  return [runMutation, transformResult(result)];
};
