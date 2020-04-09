import { useQuery } from "@apollo/react-hooks";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";

const TRANSACTIONS_QUERY = gql`
  query($filter: TransactionsFilterInput) GetTransactions {
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

interface Account {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  account: Account | null;
  category: Category | null;
}

interface Response {
  transactions: Transaction[];
}

interface Filter {
  categoryIds: string[];
}

interface Variables {
  filter: {
    categories?: string[];
  };
}

export const useTransactions = ({
  categoryIds
}: Filter): ApolloCurrentQueryResult<Transaction[]> => {
  const result = useQuery<Response, Variables>(TRANSACTIONS_QUERY, {
    variables: { filter: { categories: categoryIds } },
    errorPolicy: "all"
  });
  return {
    ...result,
    data: result.data?.transactions
  };
};
