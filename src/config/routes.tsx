import ErrorBoundary from "@layouts/ErrorBoundary";
import Product from "@pages/Product";
import Products from "@pages/Products";
import { RouteObject } from "react-router-dom";

import App from "../App";

export enum Routes {
  MAIN = "/",
  PRODUCTS = "/products",
}

export const routesConfig: RouteObject[] = [
  {
    path: Routes.MAIN,
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: Routes.PRODUCTS,
            element: <Products />,
          },
          {
            path: `${Routes.PRODUCTS}/:productId`,
            element: <Product />,
          },
          {
            path: "*",
            element: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
];
