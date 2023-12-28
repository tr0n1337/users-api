export type HTTPRequest<B> = {
  body?: B;
  headers?: unknown;
  params?: {
    id?: string;
  };
};

export type HTTPResponse<T> = {
  body: T;
  statusCode: HTTPStatusCode;
  error?: Error | unknown;
};

export type HTTPError = {
  message: string;
  statusCode: HTTPStatusCode;
};

export enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface IController {
  execute(httpRequest: HTTPRequest<unknown>): Promise<unknown>;
}

export interface IControllerWithId {
  execute(id: string, httpRequest: HTTPRequest<unknown>): Promise<unknown>;
}
