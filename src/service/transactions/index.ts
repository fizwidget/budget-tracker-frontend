import { useQuery } from "@apollo/react-hooks";
import { TRANSACTIONS_QUERY } from "./gql";
import { ServiceQueryResult } from "../../types/service-result";
import { Transaction } from "../../types/transaction";
import { CategoryId } from "../../types/category";
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
  const result = useQuery<GetTransactions, GetTransactionsVariables>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        filter: {
          ...(filter.categoryIds ? { categories: filter.categoryIds } : {}),
        },
      },
    }
  );
  console.log(result.client.cache);
  return transformResult(result);
};
