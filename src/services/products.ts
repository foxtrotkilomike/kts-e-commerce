import { API_BASE_URL, ENDPOINTS } from "@config/api";
import { ApiError, Product } from "@config/types";
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

const getProductsRange = async (
  offset: number = 0,
  limit: number = 9
): Promise<Product[] | ApiError> => {
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

const getProductById = async (
  productId: number
): Promise<Product | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${productsEndpoint}/${productId}`,
  })
    .then(({ data }) => data as Product)
    .catch(handleApiErrors);
};

export { getAllProducts, getProductsRange, getProductById };
