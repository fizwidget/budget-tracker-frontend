import { useQuery } from "@apollo/react-hooks";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";

const SAVINGS_RATE = gql`
  query {
    transactions {
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

export const useTransactions = (): ApolloCurrentQueryResult<Transaction[]> => {
  const result = useQuery<Response>(SAVINGS_RATE, { errorPolicy: "all" });
  return {
    ...result,
    data: result.data?.transactions
  };
};
