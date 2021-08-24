import React from "react";

import ProductItem from "../ProductItem/ProductItem";

import s from "./ProductsList.module.scss";

const ProductsList = ({ products }) => {
  return (
    <div className={s.products}>
      {products &&
        products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
    </div>
  );
};

export default ProductsList;
