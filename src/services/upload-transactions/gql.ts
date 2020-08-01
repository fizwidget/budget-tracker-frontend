import { gql } from "@apollo/client";
import { TRANSACTION_FIELDS } from "../transactions/gql";

export const UPLOAD_TRANSACTIONS = gql`
  mutation UploadTransactions($input: RecordTransactionsInput!) {
    recordTransactions(input: $input) {
      success
      message
      errorType
      transactions {
        ...TransactionFields
      }
    }
  }
  ${TRANSACTION_FIELDS}
`;
