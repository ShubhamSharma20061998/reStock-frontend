import React from "react";
import { useRoutes } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import Register from "../components/registerForm/Register";
import ShopRegisterForm from "../components/shop-register/ShopRegisterForm";
import PostLoginPage from "../pages/postLoginPage";
import SingleShop from "../pages/shop-view/SingleShop";
import Cart from "../components/cart/Cart";
import ErrorPage from "../pages/errors/ErrorPage";
import UserNav from "../components/user-nav/UserNav";
import UserProfile from "../components/user-nav/userProfile/UserProfile";
import UserOrders from "../components/orders/UserOrders";
import AdminNav from "../components/admin/admin-nav/AdminNav";
import CreateProductForm from "../components/admin/products/CreateProductForm";
import SingleProductView from "../components/admin/products/SingleProductView";
import OrdersNotification from "../components/admin/pages/OrdersNotification";

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
      path: "/orders/:id",
      element: (
        <>
          <UserNav />
          <UserOrders />
        </>
      ),
    },
    {
      path: "/admin-profile/:id",
      element: (
        <>
          <AdminNav />
        </>
      ),
    },
    {
      path: "/shop/:id",
      element: (
        <>
          <AdminNav />
          <SingleShop />
        </>
      ),
    },
    {
      path: "/create_product",
      element: (
        <>
          <AdminNav />
          <CreateProductForm />
        </>
      ),
    },
    {
      path: "/registerShop",
      element: (
        <>
          <AdminNav />
          <ShopRegisterForm />
        </>
      ),
    },
    {
      path: "/ordersNotification",
      element: (
        <>
          <AdminNav />
          <OrdersNotification />
        </>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return myRoutes;
};
export default CustomRoutes;
