import React from "react";
import { useRoutes } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import Register from "../components/registerForm/Register";
import ShopRegisterForm from "../components/shop-register/ShopRegisterForm";
import PostLoginPage from "../pages/postLoginPage";
import SingleShop from "../pages/shop-view/SingleShop";
import CreateProductForm from "../components/products/CreateProductForm";
import Cart from "../components/cart/Cart";
import SingleProductView from "../components/products/SingleProductView";
import ErrorPage from "../pages/errors/ErrorPage";
import UserNav from "../components/user-nav/UserNav";
import UserLandingPage from "../pages/UserLandingPage";
import UserProfile from "../components/user-nav/userProfile/UserProfile";

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
      element: (
        <>
          <UserNav />
          <SingleShop />
        </>
      ),
    },
    {
      path: "/product-view/:slug",
      element: (
        <>
          <UserNav />
          <SingleProductView />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <UserNav />
          <Cart />
        </>
      ),
    },
    {
      path: "/user-profile/:id",
      element: (
        <>
          <UserNav />
          <UserProfile />
        </>
      ),
    },
    {
      path: "/create_product",
      element: <CreateProductForm />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return myRoutes;
};
export default CustomRoutes;
