import React from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import ApiError from "@customTypes/ApiError";
import Product from "@customTypes/Product";

import classes from "./ProductContent.module.scss";

type ProductContentProps = {
  isLoading: boolean;
  isEmpty: boolean;
  content: Product | Product[];
  renderContent: () => JSX.Element;
  responseError: ApiError;
};

const ProductContent = ({
  isLoading,
  isEmpty,
  content,
  renderContent,
  responseError,
}: ProductContentProps): JSX.Element => {
  if (!isEmpty || content !== undefined) {
    return renderContent();
  }

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader size={LoaderSize.l} />
      </div>
    );
  }

  return (
    <div className={classes.error}>
      <EmptyContent error={responseError} />
    </div>
  );
};

export default ProductContent;
