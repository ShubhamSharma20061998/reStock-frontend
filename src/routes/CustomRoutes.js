import React from "react";
import { useRoutes } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import Register from "../components/registerForm/Register";
import ShopRegisterForm from "../components/shop-register/ShopRegisterForm";
import PostLoginPage from "../pages/postLoginPage";
import SingleShop from "../pages/shop-view/SingleShop";
import CreateProductForm from "../components/products/CreateProductForm";

const CustomRoutes = () => {
  let myRoutes = useRoutes([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/landingPage",
      element: <PostLoginPage />,
    },
    {
      path: "/registerShop",
      element: <ShopRegisterForm />,
    },
    {
      path: "/shop/:id",
      element: <SingleShop />,
    },
    {
      path: "/create_producr",
      element: <CreateProductForm />,
    },
  ]);
  return myRoutes;
};
export default CustomRoutes;
