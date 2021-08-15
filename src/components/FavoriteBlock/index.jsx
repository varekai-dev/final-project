import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFavoriteProducts } from "../../redux/slices/favoritesSlice";
import ProductItem from "../ProductItem/ProductItem";

import s from "./FavoriteBlock.module.scss";

const FavoriteBlock = () => {
  const favoriteItems = useSelector((state) => state.favorite.favoriteList);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  return (
    <div className={s.favorite}>
      {favoriteItems.length > 0 ? (
        favoriteItems.map((favoriteItem) => (
          <ProductItem key={favoriteItem.id} {...favoriteItem} />
        ))
      ) : (
        <div className={s.favoriteEmpty}>List is empty</div>
      )}
    </div>
  );
};

export default FavoriteBlock;
