import { gql } from "apollo-boost";

export const TRANSACTIONS_QUERY = gql`
  query GetTransactions($filter: TransactionsFilterInput) {
    transactions(filter: $filter) {
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
  }
`;
