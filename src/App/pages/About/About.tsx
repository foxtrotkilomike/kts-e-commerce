import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import Wrapper from "@components/Wrapper";

import classes from "./About.module.scss";

const About = (): JSX.Element => {
  return (
    <Wrapper centered main className={classes.wrapper}>
      <Typography tagName={TypographyTagName.h1} size={TypographySize.xl}>
        About us page
      </Typography>
    </Wrapper>
  );
};

export default About;
