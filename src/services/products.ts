import { API_BASE_URL, ENDPOINTS } from "@config/api";
import {
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
} from "@config/constants";
import ApiError from "@customTypes/ApiError";
import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import GetProductByIdConfig from "@customTypes/GetProductByIdConfig";
import GetProductsRangeConfig from "@customTypes/GetProductsRangeConfig";
import Product from "@customTypes/Product";
import { handleApiErrors } from "@utils/handleApiErrors";
import axios from "axios";

const { base: productsEndpoint } = ENDPOINTS.products;

const getAllProducts = async (): Promise<Product[] | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${productsEndpoint}`,
  })
    .then(({ data }) => data as Product[])
    .catch(handleApiErrors);
};

const getProductsRange = async ({
  offset = DEFAULT_PRODUCTS_OFFSET,
  limit = DEFAULT_PRODUCTS_LIMIT,
}: GetProductsRangeConfig): Promise<Product[] | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${productsEndpoint}`,
    params: {
      offset,
      limit,
    },
  })
    .then(({ data }) => data as Product[])
    .catch(handleApiErrors);
};

const getProductById = async ({
  productId,
}: GetProductByIdConfig): Promise<Product | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${productsEndpoint}/${productId}`,
  })
    .then(({ data }) => data as Product)
    .catch(handleApiErrors);
};

const getFilteredProducts = async ({
  title,
  price,
  price_min,
  price_max,
  categoryId,
  offset = DEFAULT_PRODUCTS_OFFSET,
  limit = DEFAULT_PRODUCTS_LIMIT,
}: GetFilteredProductsConfig): Promise<Product[] | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${productsEndpoint}/`,
    params: {
      title,
      price,
      price_min,
      price_max,
      categoryId,
      offset,
      limit,
    },
  })
    .then(({ data }) => data as Product[])
    .catch(handleApiErrors);
};

export {
  getAllProducts,
  getProductsRange,
  getProductById,
  getFilteredProducts,
};
