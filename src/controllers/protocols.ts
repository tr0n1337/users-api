export type HTTPRequest<B> = {
  body?: B;
  headers?: unknown;
  params?: {
    id?: string;
  };
};

export type HTTPResponse<T> = {
  statusCode: number;
  body: T | string;
  error?: Error | unknown;
};
