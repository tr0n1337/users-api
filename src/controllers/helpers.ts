import { HTTPResponse, HTTPStatusCode } from "@/controllers/protocols";

export const successRequest = <T>(body: T): HTTPResponse<T> => {
  return {
    statusCode: HTTPStatusCode.OK,
    body: body,
  };
};

export const createdRequest = <T>(body: T): HTTPResponse<T> => {
  return {
    statusCode: HTTPStatusCode.CREATED,
    body: body,
  };
};

export const badRequest = (message: string): HTTPResponse<string> => {
  return {
    statusCode: HTTPStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const internalServerError = (
  error: Error | unknown,
): HTTPResponse<string> => {
  return {
    statusCode: HTTPStatusCode.SERVER_ERROR,
    body: "Something went wrong",
    error,
  };
};
