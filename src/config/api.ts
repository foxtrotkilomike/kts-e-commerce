import { ResponseStatus } from "@config/constants";
import ApiError from "@customTypes/ApiError";
import Endpoint from "@customTypes/Endpoint";
import Product from "@customTypes/Product";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

const ENDPOINTS: Record<string, Endpoint> = {
  products: {
    base: "/products",
  },
  categories: {
    base: "/categories",
  },
  users: {
    base: "/users",
    isAvailable: "/is-available",
  },
  auth: {
    base: "/auth",
    login: "/login",
    profile: "/profile",
    refreshToken: "/refresh-token",
  },
};

enum ERROR_TYPE {
  SERVER_NOT_RESPONDING = "serverIsNotResponding",
  FALLBACK = "fallback",
  INITIAL = "initial",
}

const API_ERRORS: Record<ERROR_TYPE, ApiError> = {
  [ERROR_TYPE.SERVER_NOT_RESPONDING]: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: "Server is not responding",
  },
  [ERROR_TYPE.FALLBACK]: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: "Unknown error",
  },
  [ERROR_TYPE.INITIAL]: {
    code: 0,
    message: "",
  },
};

const INITIAL_PRODUCTS: Product[] = [];

export { API_BASE_URL, ENDPOINTS, API_ERRORS, INITIAL_PRODUCTS };
