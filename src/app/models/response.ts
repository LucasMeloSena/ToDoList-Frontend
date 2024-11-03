export interface Response<T> {
  data: T;
  error: boolean;
  message: string;
  timestamp: string;
}
