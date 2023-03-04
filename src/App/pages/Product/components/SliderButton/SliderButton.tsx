import { useMemo } from "react";

import { ReactComponent as LeftArrow } from "@assets/svg/arr_left.svg";
import { ReactComponent as RightArrow } from "@assets/svg/arr_right.svg";
import { useSwiper } from "swiper/react";

import classes from "./SliderButton.module.scss";

const SliderButton = ({ type, className }: SliderButtonProps): JSX.Element => {
  const swiper = useSwiper();
  const buttonConfig = useMemo(
    () => ({
      prev: {
        onClick: () => swiper.slidePrev(),
        content: <LeftArrow className={classes.icon} />,
      },
      next: {
        onClick: () => swiper.slideNext(),
        content: <RightArrow className={classes.icon} />,
      },
    }),
    [swiper]
  );

  const { onClick, content } = buttonConfig[type];

  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
};

type SliderButtonProps = {
  type: "prev" | "next";
  className: string;
};

export default SliderButton;
