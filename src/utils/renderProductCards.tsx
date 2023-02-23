import Card from "@components/Card";
import Price from "@components/Price";
import { Product } from "@config/types";

const renderProductCards = (products: Product[]) => {
  return products.map((product) => {
    const { id, price } = product;
    return (
      <Card product={product} content={<Price price={price} />} key={id} />
    );
  });
};

export default renderProductCards;
