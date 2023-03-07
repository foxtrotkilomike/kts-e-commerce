import { API_ERRORS } from "@config/api";
import ApiError from "@customTypes/ApiError";
import { AxiosError } from "axios";

export const handleApiErrors = (error: AxiosError): ApiError => {
  const { response, request } = error;

  if (error.isAxiosError) {
    if (response) {
      return {
        code: response.status,
        message: (response.data as ApiError).message,
      };
    } else if (request) {
      return API_ERRORS.serverIsNotResponding;
    }
  }

  return API_ERRORS.fallback;
};
