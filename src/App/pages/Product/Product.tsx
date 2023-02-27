import { useMemo } from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import Wrapper from "@components/Wrapper";
import { DEFAULT_ERROR_STATUS, DEFAULT_PRODUCT_ID } from "@config/constants";
import { productsMock } from "@config/data";
import { ApiError, Product as ProductType } from "@config/types";
import useFetchProducts, { FetchFunctionParams } from "@hooks/useFetchProducts";
import { getProductById } from "@services/products";
import { useParams } from "react-router-dom";

import ProductInfo from "./components/ProductInfo";
import RelatedProducts from "./components/RelatedProducts";
import classes from "./Product.module.scss";

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
  const isLoadingContent = responseError.code === DEFAULT_ERROR_STATUS;

  const renderProducts = () =>
    !isEmptyProduct ? (
      <ProductInfo product={product} />
    ) : isLoadingContent ? (
      <div className={classes.loader}>
        <Loader size={LoaderSize.l} />
      </div>
    ) : (
      <div className={classes.error}>
        <EmptyContent error={responseError} />
      </div>
    );

  return (
    <Wrapper main>
      {renderProducts()}
      <RelatedProducts productCategoryId={product.category.id} />
    </Wrapper>
  );
};

export default Product;
