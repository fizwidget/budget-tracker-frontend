import { MutationResult } from "@apollo/react-common";
import {
  ServiceQueryResult,
  loadingResult,
  errorResult,
  successResult,
} from "../../common/types/service-result";
import { UploadTransactions } from "./__generated__/UploadTransactions";

export const transformResult = (
  result: MutationResult<UploadTransactions>
): ServiceQueryResult<void> => {
  if (result.loading) {
    return loadingResult();
  }
  if (result.error) {
    return errorResult(result.error);
  }
  if (result.data?.recordTransactions?.success) {
    return successResult(undefined);
  }
  if (result.data === undefined) {
    return loadingResult();
  }
  return errorResult(Error(result.data?.recordTransactions?.message));
};
