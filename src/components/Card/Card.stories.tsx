import React from "react";

import { Card, CardProps } from "./Card";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    image: {
      defaultValue: "/logo512.png",
      control: "text",
    },
    title: {
      mapping: {
        undefined: undefined,
      },
      control: "text",
    },
    subtitle: {
      mapping: {
        undefined: undefined,
      },
      control: "text",
    },
    content: {
      mapping: {
        undefined: undefined,
      },
      control: "text",
    },
  },
};

export const Default = (props: CardProps) => <Card {...props} />;
Default.args = {
  image: "",
  category: "Chair",
  title: "White Aesthetic Chair",
  subtitle:
    "Combination of wood and wool Combination of wood and wool Combination of wood and wool",
  content: (
    <span>
      <b>299р</b>
      <i>5 отзывов</i>
    </span>
  ),
};
