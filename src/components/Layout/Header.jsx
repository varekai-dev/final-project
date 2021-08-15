import React from "react";
import { Link, useHistory } from "react-router-dom";
import { LikeIcon, CartIcon, LogoIcon } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopup } from "../../redux/slices/popupSlice";
import UserMenu from "../UserMenu";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const orders = useSelector((state) => state.orders.orders);

  const clickFavorite = () => {
    if (user) {
      history.push("/settings?tab=favorites");
    } else {
      dispatch(setActivePopup("guestPopup"));
    }
  };

  return (
    <header className="header">
      <div className="header__inner d-flex justify-between align-center">
        <div className="header-left d-flex justify-between align-center flex">
          <Link to={"/"} className="header-logo">
            <LogoIcon />
          </Link>
          <div className="header-icons">
            <div onClick={clickFavorite}>
              <LikeIcon fill="#ffffff" />
            </div>

            <Link to={"/cart"}>
              {orders.length > 0 && (
                <span className="header-cart__count"> {orders.length}</span>
              )}
              <CartIcon />
            </Link>
          </div>
        </div>

        <div className="header-buttons d-flex justify-between align-center">
          <div className="header-auth d-flex align-center">
            {user ? (
              <UserMenu />
            ) : (
              <div className="header-auth__btns">
                <button onClick={() => dispatch(setActivePopup("register"))}>
                  REGISTER
                </button>

                <button onClick={() => dispatch(setActivePopup("login"))}>
                  LOG IN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
