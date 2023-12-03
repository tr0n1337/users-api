export interface HTTPResponse<T> {
  statusCode: number;
  body: T | string;
  error?: Error | unknown;
}
