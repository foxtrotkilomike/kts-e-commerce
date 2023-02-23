enum ResponseStatus {
  "UNKNOWN_ERROR" = 0,
  "BAD_REQUEST" = 400,
  "NOT_AUTHORIZED" = 401,
  "INTERNAL_SERVER_ERROR" = 500,
  "UNHANDLED_REJECTION" = 503,
}

enum Routes {
  MAIN = "/",
  PRODUCTS = "/products",
  CATEGORIES = "/categories",
  ABOUT = "/about",
}

export { ResponseStatus, Routes };
