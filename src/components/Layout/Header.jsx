import React from "react";
import { Link } from "react-router-dom";
import { LikeIcon, CartIcon, ChevronIcon, LogoIcon } from "../icons";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { setActivePopup } from "../../redux/slices/popupSlice";
import { selectPopup, selectUserData } from "../../redux/selectors";

const Header = () => {
  const [isMenuActive, setMenuActive] = React.useState(false);
  const dispatch = useDispatch();
  const activePopup = useSelector(selectPopup);
  const user = useSelector(selectUserData);
  const username = user ? user.account.fullName : false;
  const firstLettersUpperCase = (username) => {
    if (!username) {
      return;
    }
    const userNameFirstLetters = username
      .split(" ")
      .map((word) => word[0].toUpperCase());
    return userNameFirstLetters.join("");
  };
  const handleLogout = () => {
    dispatch(setUser(""));
  };
  return (
    <header className="header">
      <div className="header__inner d-flex justify-between align-center">
        <div className="header-left d-flex justify-between align-center flex">
          <LogoIcon />
          <div className="header-icons">
            <LikeIcon fill="#ffffff" />
            <CartIcon />
          </div>
        </div>

        <div className="header-buttons d-flex justify-between align-center">
          <div className="header-auth d-flex align-center">
            {user ? (
              <div
                className="header-user__wrapper d-flex align-center"
                onClick={() => setMenuActive(!isMenuActive)}
              >
                <div>Welcome {username}!</div>
                <div className="header-user d-flex align-center ">
                  <div className="header-user__logo d-flex align-center justify-center">
                    {firstLettersUpperCase(username)}
                  </div>
                  <ChevronIcon fill="#fff" />
                  {isMenuActive && (
                    <div>
                      <div>
                        <p>
                          <b>{username}</b>
                        </p>
                        <p>user.account.email</p>
                      </div>
                      <div>
                        <Link to="/account/settings">
                          <a href="/account/settings">Settings</a>
                        </Link>

                        <button onClick={handleLogout}>Log out</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <button onClick={() => dispatch(setActivePopup("register"))}>
                  REGISTER
                </button>
                {activePopup === "register" && <RegisterForm />}
                <button onClick={() => dispatch(setActivePopup("login"))}>
                  LOG IN
                </button>
                {activePopup === "login" && <LoginForm />}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
