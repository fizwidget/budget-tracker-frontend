import { useQuery } from "@apollo/client";

import { ClientServiceResult } from "../../types/service-result";
import { CategoryId, toCategoryId } from "../../types/category";
import { GetSelectedCategory } from "./__generated__/GetSelectedCategory";
import { SELECTED_CATEGORY_QUERY } from "./gql";

import { makeVar } from "@apollo/client";

const selectedCategoryVar = makeVar<CategoryId | null>(null);

export const selectedCategoryTypePolicy = {
  selectedCategory: {
    read() {
      return selectedCategoryVar();
    },
  },
};

export const useSelectedCategory = (): ClientServiceResult<CategoryId | null> => {
  const { data } = useQuery<GetSelectedCategory>(SELECTED_CATEGORY_QUERY);
  const selectedCategoryId = data?.selectedCategory
    ? toCategoryId(data.selectedCategory)
    : null;

  const setSelectedCategoryId = (categoryId: CategoryId | null) => {
    selectedCategoryVar(categoryId);
  };

  return {
    data: selectedCategoryId,
    mutate: setSelectedCategoryId,
  };
};
