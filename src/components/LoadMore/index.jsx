import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMoreProductsByCategory,
  fetchMoreProductsBySearch,
  fetchMoreProductsBySort,
} from "../../redux/slices/filterSlice";
import { fetchMoreProducts } from "../../redux/slices/productsSlice";
import Button from "../UI/Button";

import s from "./LoadMore.module.scss";

const LoadMore = () => {
  const limit = useSelector((state) => state.products.limit);
  const [itemsNumber, setItemsNumber] = React.useState(limit);
  const { activeCategory, activeSortBy, searchValue } = useSelector(
    (state) => state.filter
  );
  const filtersOff =
    !activeCategory && !activeSortBy && searchValue.length === 0;
  const dispatch = useDispatch();
  const handleLoadMore = () => {
    setItemsNumber(itemsNumber + limit);
    if (filtersOff) {
      dispatch(fetchMoreProducts(itemsNumber));
    }
    if (activeSortBy) {
      dispatch(fetchMoreProductsBySort(itemsNumber));
    }
    if (activeCategory) {
      dispatch(fetchMoreProductsByCategory(itemsNumber));
    }
    if (searchValue.length > 0) {
      dispatch(fetchMoreProductsBySearch(itemsNumber));
    }
  };
  React.useEffect(() => {
    setItemsNumber(limit);
  }, [activeCategory, activeSortBy, searchValue, limit]);
  return (
    <Button color="blue" className={s.loadMore} onClick={handleLoadMore}>
      Load more ...
    </Button>
  );
};

export default LoadMore;
