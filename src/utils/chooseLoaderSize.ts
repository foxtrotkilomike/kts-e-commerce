import { LoaderSize } from "@components/Loader";

export const chooseLoaderSize = (width: number, height: number) => {
  switch (true) {
    case width <= 100 || height <= 100:
      return LoaderSize.s;

    case width <= 200 || height <= 200:
      return LoaderSize.m;

    default:
      return LoaderSize.l;
  }
};
