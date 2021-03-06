import { useQuery } from "@apollo/client";

import { ServiceQueryResult } from "../../types/service-result";
import { Transaction } from "../../types/transaction";
import { CategoryId } from "../../types/category";
import { TRANSACTIONS_QUERY } from "./gql";
import { transformResult } from "./utils";
import {
  GetTransactions,
  GetTransactionsVariables,
} from "./__generated__/GetTransactions";

interface Filter {
  categoryIds?: CategoryId[];
}

export const useTransactions = (
  filter: Filter
): ServiceQueryResult<Transaction[]> => {
  const variables = {
    filter: {
      ...(filter.categoryIds ? { categories: filter.categoryIds } : {}),
    },
  };

  const result = useQuery<GetTransactions, GetTransactionsVariables>(
    TRANSACTIONS_QUERY,
    { variables }
  );

  return transformResult(result);
};
