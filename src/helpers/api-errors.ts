import {
  HTTPResponse,
  HTTPError,
  HTTPStatusCode,
} from "@/controllers/protocols";

export const HTTPResponseError = (
  statusCode: HTTPStatusCode = HTTPStatusCode.BAD_REQUEST,
  message: string = "Internal server error",
): HTTPResponse<HTTPError> => {
  return {
    statusCode,
    body: {
      message,
    },
  };
};
