/**
 * Client service result.
 */

export interface ClientServiceResult<T> {
  data: T;
  mutate: (data: T) => void;
}

/**
 * General service result.
 */

interface Loading<T> {
  loading: true;
  data: undefined;
  error: undefined;
}

interface Success<T> {
  loading: false;
  data: T;
  error: undefined;
}

interface Failure<T> {
  loading: false;
  data: undefined;
  error: Error;
}

interface NotRunning<T> {
  loading: false;
  data: undefined;
  error: undefined;
}

export const loading = <T>(): Loading<T> => ({
  loading: true,
  data: undefined,
  error: undefined,
});

export const failure = <T>(error: Error): Failure<T> => ({
  loading: false,
  data: undefined,
  error,
});

export const success = <T>(data: T): Success<T> => ({
  loading: false,
  data,
  error: undefined,
});

export const notRunning = <T>(): NotRunning<T> => ({
  loading: false,
  data: undefined,
  error: undefined,
});

/**
 * Query service result.
 */

export type ServiceQueryResult<T> = Loading<T> | Success<T> | Failure<T>;

/**
 * Mutation service result.
 */

export type ServiceMutationState<T> =
  | Loading<T>
  | Success<T>
  | Failure<T>
  | NotRunning<T>;

export type ServiceMutationResult<MutationInput, MutationOutput> = [
  (input: MutationInput) => void,
  ServiceMutationState<MutationOutput>
];
