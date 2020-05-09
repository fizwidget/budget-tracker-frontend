import { QueryResult } from "@apollo/react-common";
import {
  GetCategories,
  GetCategories_categories,
} from "./__generated__/GetCategories";
import { Category, toCategoryId } from "../../common/types/category";
import {
  ServiceQueryResult,
  loadingResult,
  successResult,
  errorResult,
} from "../../common/types/service-result";

const transformCategory = (input: GetCategories_categories): Category => ({
  id: toCategoryId(input.id),
  name: input.name,
});

export const transformResult = (
  result: QueryResult<GetCategories>
): ServiceQueryResult<Category[]> => {
  if (result.loading) {
    return loadingResult();
  }
  if (result.error) {
    return errorResult(result.error);
  }

  const categories = result.data?.categories;

  return categories
    ? successResult(categories.map(transformCategory))
    : errorResult(Error("No categories"));
};
