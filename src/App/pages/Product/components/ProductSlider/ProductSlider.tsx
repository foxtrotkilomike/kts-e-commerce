import { ReactComponent as LeftArrow } from "@assets/svg/arr_left.svg";
import { ReactComponent as RightArrow } from "@assets/svg/arr_right.svg";

import classes from "./ProductSlider.module.scss";

type ProductSliderProps = {
  image: string[];
};

const ProductSlider = ({ image }: ProductSliderProps): JSX.Element => {
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
      <img className={classes.slider__image} src={image[0]} alt="" />
    </div>
  );
};

export default ProductSlider;
