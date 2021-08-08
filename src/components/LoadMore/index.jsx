import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoreProductsByCategory,
  fetchMoreProductsBySort,
} from "../../redux/slices/filterSlice";
import { fetchMoreProducts } from "../../redux/slices/productsSlice";
import Button from "../Button";

import s from "./LoadMore.module.scss";

const LoadMore = () => {
  const limit = useSelector((state) => state.products.limit);
  const [itemsNumber, setItemsNumber] = React.useState(limit);
  const { activeCategory, activeSortBy } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    setItemsNumber(itemsNumber + limit);
    if (!activeCategory && !activeSortBy) {
      dispatch(fetchMoreProducts(itemsNumber));
    }
    if (activeSortBy) {
      console.log("test");
      dispatch(fetchMoreProductsBySort(itemsNumber));
    }
    if (activeCategory) {
      dispatch(fetchMoreProductsByCategory(itemsNumber));
    }
  };
  return (
    <Button color="blue" className={s.loadMore} onClick={handleLoadMore}>
      Load more ...
    </Button>
  );
};

export default LoadMore;
