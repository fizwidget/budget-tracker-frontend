import { useQuery } from "@apollo/react-hooks";
import { gql, ApolloCurrentQueryResult } from "apollo-boost";
import { GetCategories, GetCategories_categories } from "./types/GetCategories";

const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

interface Result {
  categories: GetCategories_categories[];
}

export const useCategories = (): ApolloCurrentQueryResult<Result> => {
  const result = useQuery<GetCategories>(CATEGORIES_QUERY, {
    errorPolicy: "all"
  });
  return {
    ...result,
    data: result.data?.categories || undefined
  };
};
