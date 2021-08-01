import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBlock from "../../components/FilterBlock";
import LoadMore from "../../components/LoadMore";
import ProductsList from "../../components/ProductsList/ProductsList";
import { fetchProducts } from "../../redux/slices/productsSlice";

import s from "./HomeScreen.module.scss";

const HomeScreen = () => {
  const products = useSelector((state) => state.products.productsList);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={s.homeScreen}>
      <FilterBlock />
      <ProductsList products={products} />
      <LoadMore />
    </div>
  );
};

export default HomeScreen;
