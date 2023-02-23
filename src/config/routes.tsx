import { Routes } from "@config/constants";
import ErrorBoundary from "@layouts/ErrorBoundary";
import About from "@pages/About";
import Categories from "@pages/Categories";
import Product from "@pages/Product";
import Products from "@pages/Products";
import { RouteObject } from "react-router-dom";

import App from "../App";

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
            path: Routes.CATEGORIES,
            element: <Categories />,
          },
          {
            path: Routes.ABOUT,
            element: <About />,
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
