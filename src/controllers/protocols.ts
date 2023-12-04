export type HTTPRequest<B> = {
  body?: B;
  headers?: unknown;
  params?: unknown;
};

export type HTTPResponse<T> = {
  statusCode: number;
  body: T | string;
  error?: Error | unknown;
};
