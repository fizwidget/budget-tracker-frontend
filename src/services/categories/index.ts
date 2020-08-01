import { useQuery } from "@apollo/client";

import { ServiceQueryResult } from "../../types/service-result";
import { Category } from "../../types/category";
import { GetCategories } from "./__generated__/GetCategories";
import { CATEGORIES_QUERY } from "./gql";
import { transformResult } from "./utils";

export const useCategories = (): ServiceQueryResult<Category[]> => {
  const result = useQuery<GetCategories>(CATEGORIES_QUERY);
  return transformResult(result);
};
