import { gql } from "@apollo/client";
import { TRANSACTION_FIELDS } from "../transactions/gql";

export const CATEGORISE_TRANSACTION_MUTATION = gql`
  mutation CategoriseTransaction($input: CategoriseTransactionInput!) {
    categoriseTransaction(input: $input) {
      success
      message
      errorType
      transaction {
        ...TransactionFields
      }
    }
  }
  ${TRANSACTION_FIELDS}
`;
