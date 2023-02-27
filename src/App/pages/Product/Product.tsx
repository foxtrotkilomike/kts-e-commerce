import { useMemo } from "react";

import Wrapper from "@components/Wrapper";
import { DEFAULT_PRODUCT_ID } from "@config/constants";
import { productsMock } from "@config/data";
import GetProductByIdConfig from "@customTypes/GetProductByIdConfig";
import useFetchProduct from "@hooks/useFetchProduct";
import ProductContent from "@layouts/ProductContent";
import ProductInfo from "@pages/Product/components/ProductInfo";
import { getProductById } from "@services/products";
import { useParams } from "react-router-dom";

import RelatedProducts from "./components/RelatedProducts";

const Product = (): JSX.Element => {
  const { productId } = useParams();
  const productIdNumber = productId ? Number(productId) : DEFAULT_PRODUCT_ID;

  const fetchConfig = useMemo(() => {
    return { productId: productIdNumber };
  }, [productIdNumber]);

  const { product, isLoading, responseError } =
    useFetchProduct<GetProductByIdConfig>(
      productsMock,
      fetchConfig,
      getProductById
    );

  const isEmptyProduct = product.id === DEFAULT_PRODUCT_ID;
  const renderProduct = () => <ProductInfo product={product} />;

  return (
    <Wrapper main>
      <ProductContent
        isLoading={isLoading}
        isEmpty={isEmptyProduct}
        content={product}
        renderContent={renderProduct}
        responseError={responseError}
      />
      <RelatedProducts productCategoryId={product.category.id} />
    </Wrapper>
  );
};

export default Product;
