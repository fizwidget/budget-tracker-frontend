import { useQuery } from "@apollo/react-hooks";
import { GetCategories } from "./__generated__/GetCategories";
import { ServiceQueryResult } from "../../common/types/service-result";
import { Category } from "../../common/types/category";
import { CATEGORIES_QUERY } from "./gql";
import { transformResult } from "./utils";

export const useCategories = (): ServiceQueryResult<Category[]> => {
  const result = useQuery<GetCategories>(CATEGORIES_QUERY);
  return transformResult(result);
};
