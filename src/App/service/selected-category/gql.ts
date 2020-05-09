import { gql } from "apollo-boost";

export const SELECTED_CATEGORY_QUERY = gql`
  query GetSelectedCategory {
    selectedCategory @client
  }
`;
