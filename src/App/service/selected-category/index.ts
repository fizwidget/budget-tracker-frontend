import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { GetSelectedCategory } from "./types/GetSelectedCategory";

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
  const { data, client } = useQuery<GetSelectedCategory>(
    SELECTED_CATEGORY_QUERY
  );

  const setSelectedCategory = (categoryId: string | undefined) => {
    client.writeData<GetSelectedCategory>({
      data: { selectedCategory: categoryId || null },
    });
  };

  return [data?.selectedCategory || undefined, setSelectedCategory];
};
