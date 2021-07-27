import React from "react";
import { Link } from "react-router-dom";
import { LikeIcon, CartIcon, ChevronIcon, LogoIcon } from "../icons";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { popupSelector, setActivePopup } from "../../redux";

const Header = () => {
  const { activePopup } = useSelector(popupSelector);
  const dispatch = useDispatch();

  const [isMenuActive, setMenuActive] = React.useState(false);

  const user = true;
  const handleLogin = () => {
    setMenuActive((prev) => !prev);
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
            ) : (
              <>
                <div>Welcome Tony!</div>
                <div className="header-user">
                  <div className="header-user__logo">TS</div>
                  <ChevronIcon />
                  {isMenuActive && (
                    <div>
                      <div>
                        <p>
                          <b>Tony Stark</b>
                        </p>
                        <p>Tony.Stark@gmail.com</p>
                      </div>
                      <div>
                        <Link to="/account/settings">
                          <a href="/account/settings">Settings</a>
                        </Link>

                        <button onClick={handleLogin}>Log out</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
