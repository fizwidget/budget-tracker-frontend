import { gql } from "apollo-boost";

export const TRANSACTION_FIELDS = gql`
  fragment TransactionFields on Transaction {
    id
    description
    amount
    account {
      id
      name
    }
    category {
      id
      name
    }
    date
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query GetTransactions($filter: TransactionsFilterInput) {
    transactions(filter: $filter) {
      ...TransactionFields
    }
  }
  ${TRANSACTION_FIELDS}
`;
