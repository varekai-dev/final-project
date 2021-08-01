import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { readUserInfoFromLocalStorage } from "../../utils/readUserInfoFromLocalStorage";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import Loader from "../Loader";
import GuestPopup from "../GuestPopup/GuestPopup";

const Layout = ({ children }) => {
  const activePopup = useSelector((state) => state.popup.activePopup);
  const ProductsLoadingStatus = useSelector((state) => state.products.status);
  const dispatch = useDispatch();
  const user = readUserInfoFromLocalStorage();
  React.useEffect(() => {
    if (user) {
      readUserInfoFromLocalStorage();
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return (
    <>
      <Header />
      {ProductsLoadingStatus === "loading" && <Loader />}
      {activePopup === "guest-popup" && <GuestPopup />}
      {activePopup === "register" && <RegisterForm />}
      {activePopup === "login" && <LoginForm />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
