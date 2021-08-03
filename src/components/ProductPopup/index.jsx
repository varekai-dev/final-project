import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import CheckIcon from "../../assets/icons/CheckIcon";
import {
  addProductToFavorite,
  removeProductFromFavorite,
} from "../../redux/slices/favoritesSlice";
import { setActivePopup } from "../../redux/slices/popupSlice";
import { fetchSingleProduct } from "../../redux/slices/singleProductSlice";
import Button from "../Button";
import Popup from "../Popup";
import s from "./ProductPopup.module.scss";

const ProductPopup = ({ id }) => {
  const product = useSelector((state) => state.singleProduct.product);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const user = useSelector((state) => state.user.userData);
  const history = useHistory();
  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };
  const decreaseCount = () => {
    if (count === 1) {
      return;
    }
    setCount((prev) => prev - 1);
  };
  const toogleFavorite = () => {
    if (user) {
      if (!product.favorite) {
        dispatch(addProductToFavorite(id));
        dispatch(fetchSingleProduct(id));
      } else {
        dispatch(removeProductFromFavorite(id));
        dispatch(fetchSingleProduct(id));
      }
    } else {
      dispatch(setActivePopup("guest-popup"));
    }
  };
  React.useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);
  return (
    <Popup>
      {product && (
        <div className={s.product}>
          <div className={s.productWrapper}>
            <i className="close-btn" onClick={() => history.push("/")}>
              <CloseIcon width="18" height="18" />
            </i>
            <div className={s.content}>
              <div className={s.image}>
                <img src={product.picture} alt={product.title} />
              </div>
              <div className={s.description}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <div className={s.price}>
                  <span>PRICE</span>
                  <span>${product.price}</span>
                </div>
                <div className={s.counter}>
                  <button className={s.counterButton} onClick={decreaseCount}>
                    -
                  </button>
                  <span className={s.count}>{count}</span>
                  <button className={s.counterButton} onClick={increaseCount}>
                    +
                  </button>
                </div>
                <div className={s.items}>
                  <span>Items:</span>
                  <span>{count}</span>
                </div>
                <div className={s.items}>
                  <span>Total: </span>
                  <span>${count * product.price}</span>
                </div>
              </div>
            </div>
            <div className={s.buttons}>
              <Button color="transparent">ADD TO CART</Button>
              <Button
                onClick={toogleFavorite}
                color={product.favorite ? "orange" : "transparent"}
                className={clsx(product.favorite && s.favorite)}
              >
                {product.favorite ? (
                  <span>
                    ADDED TO FAVORITES <CheckIcon />{" "}
                  </span>
                ) : (
                  "ADD TO FAVORITES "
                )}
              </Button>
              <Button color="orange">BUY NOW</Button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ProductPopup;
