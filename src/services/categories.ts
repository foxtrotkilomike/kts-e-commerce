import { API_BASE_URL, ENDPOINTS } from "@config/api";
import ApiError from "@customTypes/ApiError";
import { CategoryModelApi } from "@store/models/platziStore";
import { handleApiErrors } from "@utils/handleApiErrors";
import axios from "axios";

const { base: categoriesEndpoint } = ENDPOINTS.categories;

const getAllCategories = async (): Promise<CategoryModelApi[] | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${categoriesEndpoint}`,
  })
    .then(({ data }) => data as CategoryModelApi[])
    .catch(handleApiErrors);
};

const getCategoryById = async (
  categoryId: number
): Promise<CategoryModelApi | ApiError> => {
  return axios({
    method: "get",
    url: `${API_BASE_URL}${categoriesEndpoint}/${categoryId}`,
  })
    .then(({ data }) => data as CategoryModelApi)
    .catch(handleApiErrors);
};

export { getAllCategories, getCategoryById };
