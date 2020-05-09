import { QueryResult } from "@apollo/react-common";
import { GetCategories, GetCategories_categories } from "./types/GetCategories";
import { Category, toCategoryId } from "../../common/types/category";
import {
  ServiceResult,
  loading,
  success,
  error,
} from "../../common/types/service-result";

const transformCategory = (input: GetCategories_categories): Category => ({
  id: toCategoryId(input.id),
  name: input.name,
});

export const transformResult = (
  result: QueryResult<GetCategories>
): ServiceResult<Category[]> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return error(result.error);
  }

  const categories = result.data?.categories;

  return categories
    ? success(categories.map(transformCategory))
    : error(Error("No categories"));
};
