import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { heroContent } from "@config/data";
import { Pages } from "@config/types";

import classes from "./Hero.module.scss";

export const Hero = ({ page }: HeroProps): JSX.Element => {
  const { heading, caption } = heroContent[page] || {
    heading: "",
    caption: "",
  };

  return (
    <section className={classes.hero}>
      <Typography
        className={classes.hero__heading}
        tagName={TypographyTagName.h1}
        size={TypographySize.xl}
      >
        {heading}
      </Typography>
      <Typography
        className={classes.hero__caption}
        tagName={TypographyTagName.paragraph}
        size={TypographySize.md}
        secondary
      >
        {caption}
      </Typography>
    </section>
  );
};

type HeroProps = {
  page: Pages;
};