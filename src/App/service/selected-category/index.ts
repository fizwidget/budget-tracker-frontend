import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SELECTED_CATEGORY_QUERY = gql`
  query GetSelectedCategory {
    selectedCategory @client
  }
`;

type UseSelectedCategory = () => [
  string | undefined,
  (categoryId: string | undefined) => void
];

export const useSelectedCategory: UseSelectedCategory = () => {
  const { data, client } = useQuery<Response>(SELECTED_CATEGORY_QUERY);

  const setSelectedCategory = (categoryId: string | undefined) => {
    client.writeData({ data: { selectedCategory: categoryId || null } });
  };

  return [data?.selectedCategory || undefined, setSelectedCategory];
};
