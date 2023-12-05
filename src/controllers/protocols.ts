export type HTTPRequest<B> = {
  body?: B;
  headers?: unknown;
  params?: {
    id?: string;
  };
};

export type HTTPResponse<T> = {
  statusCode: HTTPStatusCode;
  body: T;
  error?: Error | unknown;
};

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HTTPRequest<unknown>): Promise<HTTPResponse<unknown>>;
}
