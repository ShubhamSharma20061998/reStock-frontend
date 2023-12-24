import React, { useEffect, useState } from "react";
import AdminLandingPage from "./AdminLandingPage";
import UserLandingPage from "./UserLandingPage";
import { useDispatch } from "react-redux";
import { startShopsListing } from "../actions/shops-actions";
import { startGetProducts } from "../actions/products-action";
import { startCartItemsListing } from "../actions/cart-actions";

const PostLoginPage = () => {
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const res = localStorage.getItem("role");

  useEffect(() => {
    setRole(res);
    if (res == "admin") {
      dispatch(startShopsListing());
    } else if (res == "user") {
      dispatch(startGetProducts());
      dispatch(startCartItemsListing());
    }
  }, []);
  return (
    <div>{role == "admin" ? <AdminLandingPage /> : <UserLandingPage />}</div>
  );
};

export default PostLoginPage;
