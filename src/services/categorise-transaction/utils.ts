import { CategoriseTransaction } from "./__generated__/CategoriseTransaction";
import { MutationResult } from "@apollo/client";
import {
  ServiceMutationState,
  loading,
  failure,
  success,
  notRunning,
} from "../../types/service-result";

export const transformResult = (
  result: MutationResult<CategoriseTransaction>
): ServiceMutationState<void> => {
  if (result.loading) {
    return loading();
  }
  if (result.error) {
    return failure(result.error);
  }
  if (result.data?.categoriseTransaction?.success === true) {
    return success(undefined);
  }
  if (result.data?.categoriseTransaction?.success === false) {
    return failure(Error(result.data?.categoriseTransaction?.message));
  }
  return notRunning();
};
