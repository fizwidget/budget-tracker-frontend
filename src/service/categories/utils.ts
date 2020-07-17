import { QueryResult } from "@apollo/react-common";
import {
  GetCategories,
  GetCategories_categories,
} from "./__generated__/GetCategories";
import { Category, toCategoryId } from "../../types/category";
import {
  ServiceQueryResult,
  loading,
  success,
  failure,
} from "../../types/service-result";

const transformCategory = (input: GetCategories_categories): Category => ({
  id: toCategoryId(input.id),
  name: input.name,
});

export const transformResult = (
  result: QueryResult<GetCategories>
): ServiceQueryResult<Category[]> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return failure(result.error);
  }

  const categories = result.data?.categories;

  return categories
    ? success(categories.map(transformCategory))
    : failure(Error("No categories"));
};
