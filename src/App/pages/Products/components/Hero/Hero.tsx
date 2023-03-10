import React from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";
import { defaultHeroContent, heroContent } from "@config/data";
import Pages from "@customTypes/Pages";

import classes from "./Hero.module.scss";

type HeroProps = {
  page: Pages;
};

const Hero = ({ page }: HeroProps): JSX.Element => {
  const { heading, caption } = heroContent[page] || defaultHeroContent;

  return (
    <Wrapper centered>
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
    </Wrapper>
  );
};

export default React.memo(Hero);
