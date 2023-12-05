export type HTTPRequest<B> = {
  body?: B;
  headers?: unknown;
  params?: {
    id?: string;
  };
};

export type HTTPResponse<T> = {
  statusCode: number;
  body: T;
  error?: Error | unknown;
};

export interface IController {
  handle(httpRequest: HTTPRequest<unknown>): Promise<HTTPResponse<unknown>>;
}
