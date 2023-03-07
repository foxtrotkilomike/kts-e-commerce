import React from "react";

import EmptyContent from "@components/EmptyContent";
import Loader, { LoaderSize } from "@components/Loader";
import ApiError from "@customTypes/ApiError";
import { Product } from "@store/models/platziStore";

import classes from "./ProductContent.module.scss";

type ProductContentProps = {
  isLoading: boolean;
  isEmpty: boolean;
  data?: Product | Product[] | null;
  renderedContent: JSX.Element | null;
  responseError: ApiError;
};

const ProductContent = ({
  isLoading,
  isEmpty,
  data,
  renderedContent,
  responseError,
}: ProductContentProps): JSX.Element => {
  const hasContent = (!isEmpty || !!data) && !!renderedContent;
  if (hasContent) {
    return renderedContent;
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
