import { useQuery } from "@apollo/react-hooks";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";
import {
  GetCategories,
  GetCategories_categories as Category,
} from "./types/GetCategories";

// Borked in old TypeScript version :/
export type { Category };

const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const useCategories = (): ApolloCurrentQueryResult<Category[]> => {
  const result = useQuery<GetCategories>(CATEGORIES_QUERY, {
    errorPolicy: "all",
  });
  return {
    ...result,
    data: result.data?.categories || undefined,
  };
};
