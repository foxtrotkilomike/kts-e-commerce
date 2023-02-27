import { useMemo } from "react";

import Wrapper from "@components/Wrapper";
import { DEFAULT_ERROR_STATUS, DEFAULT_PRODUCT_ID } from "@config/constants";
import { productsMock } from "@config/data";
import ApiError from "@customTypes/ApiError";
import ProductType from "@customTypes/Product";
import useFetchProducts, { FetchFunctionParams } from "@hooks/useFetchProducts";
import SelectedProduct from "@pages/Product/components/SelectedProduct";
import { getProductById } from "@services/products";
import { useParams } from "react-router-dom";

import RelatedProducts from "./components/RelatedProducts";

const Product = (): JSX.Element => {
  const { productId } = useParams();
  const productIdNumber = productId ? Number(productId) : DEFAULT_PRODUCT_ID;

  const fetchFunctionParams = useMemo(
    () => [productIdNumber] as FetchFunctionParams,
    [productIdNumber]
  );
  const [product, responseError] = useFetchProducts<ProductType>(
    productsMock,
    () => getProductById(productIdNumber),
    fetchFunctionParams
  ) as [ProductType, ApiError];

  const isEmptyProduct = product.id === DEFAULT_PRODUCT_ID;
  const isLoading = responseError.code === DEFAULT_ERROR_STATUS;

  return (
    <Wrapper main>
      <SelectedProduct
        isLoading={isLoading}
        isEmpty={isEmptyProduct}
        product={product}
        responseError={responseError}
      />
      <RelatedProducts productCategoryId={product.category.id} />
    </Wrapper>
  );
};

export default Product;
