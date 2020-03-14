import { useQuery } from "@apollo/react-hooks";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";

const CATEGORIES_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export interface Category {
  id: string;
  name: string;
}

type Response = {
  categories: Category[];
};

export const useCategories = (): ApolloCurrentQueryResult<Category[]> => {
  const result = useQuery<Response>(CATEGORIES_QUERY, { errorPolicy: "all" });
  return {
    ...result,
    data: result.data?.categories
  };
};
