import classNames from "classnames";

import classes from "./Loader.module.scss";

/** Возможные значения размера лоадера */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

/** Пропсы, которые принимает компонент Loader */
export type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера. При передаче данного пропса, должен добавляться css-класс loader_size-{size}
   * По умолчанию: размер - LoaderSize.m, css-класс - loader_size-m
   */
  size?: LoaderSize;
  /**
   * Дополнительные CSS-классы.
   */
  className?: string;
};

const Loader = ({
  loading = true,
  size = LoaderSize.m,
  className,
}: LoaderProps): JSX.Element => {
  const loaderClassName = classNames(
    className,
    classes.loader,
    classes[`loader_size-${size}`]
  );

  return <>{loading && <div className={loaderClassName} />}</>;
};

export default Loader;
