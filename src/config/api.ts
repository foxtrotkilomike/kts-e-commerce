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

const API_ERRORS: Record<string, ApiError> = {
  serverIsNotResponding: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: "Server is not responding",
  },
  fallbackError: {
    code: ResponseStatus.UNKNOWN_ERROR,
    message: "Unknown error",
  },
};

const INITIAL_ERROR: ApiError = {
  code: 0,
  message: "",
};
const INITIAL_PRODUCTS: Product[] = [];

export { API_BASE_URL, ENDPOINTS, API_ERRORS, INITIAL_ERROR, INITIAL_PRODUCTS };
