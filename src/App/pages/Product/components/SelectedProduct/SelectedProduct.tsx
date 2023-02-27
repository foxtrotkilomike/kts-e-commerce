import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import ApiError from "@customTypes/ApiError";
import Product from "@customTypes/Product";
import ProductInfo from "@pages/Product/components/ProductInfo";

import classes from "./SelectedProduct.module.scss";

type SelectedProductProps = {
  isLoading: boolean;
  isEmpty: boolean;
  product: Product;
  responseError: ApiError;
};

const SelectedProduct = ({
  isLoading,
  isEmpty,
  product,
  responseError,
}: SelectedProductProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader size={LoaderSize.l} />
      </div>
    );
  }

  if (isEmpty || !product) {
    return (
      <div className={classes.error}>
        <EmptyContent error={responseError} />
      </div>
    );
  }

  return <ProductInfo product={product} />;
};

export default SelectedProduct;
