import { useQuery } from "@apollo/react-hooks";
import { TRANSACTIONS_QUERY } from "./gql";
import { ServiceResult } from "../../common/types/service-result";
import { Transaction } from "../../common/types/transaction";
import { CategoryId } from "../../common/types/category";
import { transformResult } from "./utils";

interface Filter {
  categoryIds: CategoryId[];
}

export const useTransactions = ({
  categoryIds,
}: Filter): ServiceResult<Transaction[]> => {
  const result = useQuery<[]>(TRANSACTIONS_QUERY, {
    variables: { filter: { categories: categoryIds } },
    errorPolicy: "all",
  });
  return transformResult(result);
};
