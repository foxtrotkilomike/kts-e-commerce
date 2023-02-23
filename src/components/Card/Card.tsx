import React from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";

import classes from "./Card.module.scss";

export type CardProps = {
  /** URL изображения */
  image: string;
  /** Категория товара */
  category?: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card = ({
  image,
  category,
  title,
  subtitle,
  content,
  onClick = () => {},
}: CardProps): JSX.Element => {
  return (
    <article className={classes.card} onClick={onClick}>
      <img className={classes.card__image} src={image} alt="" />
      {category && (
        <Typography
          className={classes.card__category}
          size={TypographySize.md}
          tagName={TypographyTagName.paragraph}
          bold
          secondary
        >
          {category}
        </Typography>
      )}
      <Typography
        size={TypographySize.md}
        tagName={TypographyTagName.h3}
        className={classes.card__title}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          className={classes.card__subtitle}
          size={TypographySize.md}
          tagName={TypographyTagName.paragraph}
          secondary
        >
          {subtitle}
        </Typography>
      )}
      {content}
    </article>
  );
};
