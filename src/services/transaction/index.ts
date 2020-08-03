import { useApolloClient } from "@apollo/client";
import { TransactionId, Transaction } from "../../types/transaction";
import { TRANSACTION_FIELDS } from "../transactions/gql";
import { TransactionFields } from "../transactions/__generated__/TransactionFields";
import { transformTransaction } from "../transactions/utils";

export const useTransaction = (id: TransactionId): Transaction => {
  const client = useApolloClient();

  const result = client.readFragment<TransactionFields>({
    id: `Transaction:${id}`,
    fragment: TRANSACTION_FIELDS,
  });

  if (result === null) {
    throw new Error(`Could not find transaction ${id} in Apollo cache`);
  }

  return transformTransaction(result);
};
