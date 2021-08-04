import React from "react";
import HomeScreen from "../HomeScreen";
import { useParams } from "react-router-dom";
import ProductPopup from "../../components/ProductPopup";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopup } from "../../redux/slices/popupSlice";

const ProductScreen = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const activePopup = useSelector((state) => state.popup.activePopup);
  React.useEffect(() => {
    dispatch(setActivePopup("product"));
  }, [id, dispatch]);

  return (
    <>
      <HomeScreen />
      {activePopup === "product" && <ProductPopup id={id} />}
    </>
  );
};

export default ProductScreen;
