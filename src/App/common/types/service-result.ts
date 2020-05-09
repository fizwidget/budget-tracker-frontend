/**
 * Client service result.
 */

export interface ClientServiceResult<T> {
  data: T;
  mutate: (data: T) => void;
}

/**
 * Query service result.
 */

export type ServiceQueryResult<T> =
  | LoadingServiceResult<T>
  | SuccessServiceResult<T>
  | ErrorServiceResult<T>;

interface LoadingServiceResult<T> {
  loading: true;
  data: undefined;
  error: undefined;
}

interface SuccessServiceResult<T> {
  loading: false;
  data: T;
  error: undefined;
}

interface ErrorServiceResult<T> {
  loading: false;
  data: undefined;
  error: Error;
}

export const loadingResult = <T>(): ServiceQueryResult<T> => ({
  loading: true,
  data: undefined,
  error: undefined,
});

export const errorResult = <T>(error: Error): ServiceQueryResult<T> => ({
  loading: false,
  data: undefined,
  error,
});

export const successResult = <T>(data: T): ServiceQueryResult<T> => ({
  loading: false,
  data,
  error: undefined,
});

/**
 * Mutation service result.
 */

export type ServiceMutationResult<MutationInput, MutationOutput> = [
  (input: MutationInput) => void,
  ServiceQueryResult<MutationOutput>
];
