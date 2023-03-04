import SliderButton from "@pages/Product/components/SliderButton";
import classNames from "classnames";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./ProductSlider.module.scss";

import "swiper/scss";
import "swiper/scss/navigation";

type ProductSliderProps = {
  images: string[];
};

const ProductSlider = ({ images }: ProductSliderProps): JSX.Element => {
  const prevButtonClassName = classNames(
    classes.slider__control,
    classes.slider__control_prev
  );
  const nextButtonClassName = classNames(
    classes.slider__control,
    classes.slider__control_next
  );

  return (
    <Swiper
      modules={[Navigation]}
      loop
      className={classes.slider}
      navigation={{
        prevEl: prevButtonClassName,
        nextEl: nextButtonClassName,
      }}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img className={classes.slider__image} src={image} alt="" />
        </SwiperSlide>
      ))}
      <SliderButton type="prev" className={prevButtonClassName} />
      <SliderButton type="next" className={nextButtonClassName} />
    </Swiper>
  );
};

export default ProductSlider;
