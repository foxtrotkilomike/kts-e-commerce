import productPhotoMock from "@assets/Rectangle23.jpg";
import { ReactComponent as LeftArrow } from "@assets/svg/arr_left.svg";
import { ReactComponent as RightArrow } from "@assets/svg/arr_right.svg";

import classes from "./ProductSlider.module.scss";

export const ProductSlider = (props: ProductSliderProps): JSX.Element => {
  return (
    <div className={classes.slider}>
      <button
        className={`${classes.slider__control} ${classes.slider__control_left}`}
      >
        <LeftArrow className={classes.icon} />
      </button>
      <button
        className={`${classes.slider__control} ${classes.slider__control_right}`}
      >
        <RightArrow className={classes.icon} />
      </button>
      <img className={classes.slider__image} src={productPhotoMock} alt="" />
    </div>
  );
};

type ProductSliderProps = Record<string, string>;
