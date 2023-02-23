import React from "react";

import Typography, {
  TypographySize,
  TypographyTagName,
} from "@components/Typography";
import { Routes } from "@config/routes";
import { Product } from "@config/types";
import { Link } from "react-router-dom";

import classes from "./Card.module.scss";

export type CardProps = {
  /** Объект со свойствами продукта */
  product: Product;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

export const Card = ({
  product,
  content,
  onClick = () => {},
}: CardProps): JSX.Element => {
  const {
    id,
    title,
    description,
    category: { name: categoryName },
    images,
  } = product;

  return (
    <Link to={`${Routes.PRODUCTS}/${id}`}>
      <article className={classes.card} onClick={onClick}>
        <img className={classes.card__image} src={images[0]} alt="" />
        {categoryName && (
          <Typography
            className={classes.card__category}
            size={TypographySize.md}
            tagName={TypographyTagName.paragraph}
            bold
            secondary
          >
            {categoryName}
          </Typography>
        )}
        <Typography
          size={TypographySize.md}
          tagName={TypographyTagName.h3}
          className={classes.card__title}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            className={classes.card__subtitle}
            size={TypographySize.md}
            tagName={TypographyTagName.paragraph}
            secondary
          >
            {description}
          </Typography>
        )}
        {content}
      </article>
    </Link>
  );
};
