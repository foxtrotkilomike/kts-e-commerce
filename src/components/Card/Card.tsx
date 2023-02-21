import React from "react";

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
      {category && <p className={classes.card__category}>{category}</p>}
      <h3 className={classes.card__title}>{title}</h3>
      <div className={classes.card__subtitle}>{subtitle}</div>
      {content}
    </article>
  );
};
