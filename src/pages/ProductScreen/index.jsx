import React from "react";
import HomeScreen from "../HomeScreen";
import { useParams } from "react-router-dom";
import ProductPopup from "../../components/ProductPopup";

const ProductScreen = () => {
  let { id } = useParams();

  return (
    <>
      <HomeScreen />
      <ProductPopup id={id} />
    </>
  );
};

export default ProductScreen;
