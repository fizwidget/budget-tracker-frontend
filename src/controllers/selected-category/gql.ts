import { gql } from "@apollo/client";

export const SELECTED_CATEGORY_QUERY = gql`
  query GetSelectedCategory {
    selectedCategory @client
  }
`;
