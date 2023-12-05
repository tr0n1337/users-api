import { HTTPResponse } from "@/controllers/protocols";

export const successRequest = <T>(body: T): HTTPResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const createdRequest = <T>(body: T): HTTPResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const badRequest = (message: string): HTTPResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const internalServerError = (
  error: Error | unknown,
): HTTPResponse<string> => {
  return {
    statusCode: 500,
    body: "Something went wrong",
    error,
  };
};
