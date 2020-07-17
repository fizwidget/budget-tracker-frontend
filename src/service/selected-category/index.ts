import { useQuery } from "@apollo/react-hooks";

import { GetSelectedCategory } from "./__generated__/GetSelectedCategory";
import { ClientServiceResult } from "../../types/service-result";
import { CategoryId, toCategoryId } from "../../types/category";
import { SELECTED_CATEGORY_QUERY } from "./gql";

export const useSelectedCategory = (): ClientServiceResult<CategoryId | null> => {
  const { data, client } = useQuery<GetSelectedCategory>(
    SELECTED_CATEGORY_QUERY
  );

  const setSelectedCategoryId = (categoryId: CategoryId | null) => {
    client.writeData<GetSelectedCategory>({
      data: { selectedCategory: categoryId },
    });
  };

  const selectedCategoryId = data?.selectedCategory
    ? toCategoryId(data.selectedCategory)
    : null;

  return {
    data: selectedCategoryId,
    mutate: setSelectedCategoryId,
  };
};
