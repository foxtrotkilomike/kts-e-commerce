import Card from "@components/Card";
import Price from "@components/Price";
import { Product } from "@config/types";

const renderProductCards = (products: Product[]) => {
  return products.map((product) => {
    const {
      id,
      title,
      description,
      images,
      category: { name },
      price,
    } = product;
    return (
      <Card
        image={images[0]}
        title={title}
        subtitle={description}
        category={name}
        content={<Price price={price} />}
        key={id}
      />
    );
  });
};

export default renderProductCards;
