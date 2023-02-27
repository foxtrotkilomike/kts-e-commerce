import React, { useLayoutEffect, useRef, useState } from "react";

import Loader, { LoaderSize } from "@components/Loader";

import classes from "./WithLoader.module.scss";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader = ({ loading, children }: WithLoaderProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaderSize, setLoaderSize] = useState<LoaderSize>(LoaderSize.m);

  useLayoutEffect(() => {
    const { width, height } = containerRef.current!.getBoundingClientRect();
    setLoaderSize(chooseLoaderSize(width, height));
  }, []);

  function chooseLoaderSize(width: number, height: number) {
    switch (true) {
      case width <= 100 || height <= 100:
        return LoaderSize.s;

      case width <= 200 || height <= 200:
        return LoaderSize.m;

      default:
        return LoaderSize.l;
    }
  }

  return (
    <div className={classes.container} ref={containerRef}>
      {children}
      {loading && (
        <div className={classes.container_inner}>
          <Loader size={loaderSize} />
        </div>
      )}
    </div>
  );
};

export default WithLoader;
