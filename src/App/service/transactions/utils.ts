import { QueryResult } from "@apollo/react-common";
import { Transaction } from "../../common/types/transaction";
import {
  ServiceResult,
  loading,
  error,
  success,
} from "../../common/types/service-result";

export const transformResult = (
  result: QueryResult<[]>
): ServiceResult<Transaction[]> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return error(result.error);
  }

  return success([]);
};
