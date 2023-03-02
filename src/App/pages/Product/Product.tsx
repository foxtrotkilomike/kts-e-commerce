import { useEffect, useMemo } from "react";

import Wrapper from "@components/Wrapper";
import { DEFAULT_PRODUCT_ID } from "@config/constants";
import { useLocalStore } from "@hooks/useLocalStore";
import ProductContent from "@layouts/ProductContent";
import ProductInfo from "@pages/Product/components/ProductInfo";
import ProductStore from "@store/ProductStore";
import { checkLoadingStatus } from "@utils/checkLoadingStatus";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import RelatedProducts from "./components/RelatedProducts";

const Product = (): JSX.Element => {
  const { productId } = useParams();
  const productIdNumber = productId ? Number(productId) : DEFAULT_PRODUCT_ID;
  const productStore = useLocalStore(() => new ProductStore());
  const {
    selectedProduct: product,
    loadingStatus,
    loadingError,
  } = productStore;

  useEffect(() => {
    if (productIdNumber !== DEFAULT_PRODUCT_ID) {
      productStore.getProductById(productIdNumber);
    }
  }, [productStore, productIdNumber]);

  const isEmptyProduct = product?.id === DEFAULT_PRODUCT_ID;
  const isLoading = checkLoadingStatus(loadingStatus);

  const renderedProduct = useMemo(
    () => (product ? <ProductInfo product={product} /> : null),
    [product]
  );

  return (
    <Wrapper main>
      <ProductContent
        isLoading={isLoading}
        isEmpty={isEmptyProduct}
        data={product}
        renderedContent={renderedProduct}
        responseError={loadingError}
      />
      <RelatedProducts productStore={productStore} />
    </Wrapper>
  );
};

export default observer(Product);
