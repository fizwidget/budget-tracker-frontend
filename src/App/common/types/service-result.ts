export type ServiceResult<T> =
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

export const loading = <T>(): ServiceResult<T> => ({
  loading: true,
  data: undefined,
  error: undefined,
});

export const error = <T>(error: Error): ServiceResult<T> => ({
  loading: false,
  data: undefined,
  error,
});

export const success = <T>(data: T): ServiceResult<T> => ({
  loading: false,
  data,
  error: undefined,
});
