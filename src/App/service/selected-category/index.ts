import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SELECTED_CATEGORY_QUERY = gql`
  query {
    selectedCategory @client
  }
`;

type UseSelectedCategory = () => [
  string | undefined,
  (categoryId: string) => void
];

interface Response {
  selectedCategory?: string;
}

export const useSelectedCategory: UseSelectedCategory = () => {
  const { data, client } = useQuery<Response>(SELECTED_CATEGORY_QUERY);

  const setSelectedCategory = (categoryId: string) => {
    client.writeData({ data: { selectedCategory: categoryId } });
  };

  return [data?.selectedCategory, setSelectedCategory];
};
