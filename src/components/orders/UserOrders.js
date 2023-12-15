import { Container, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startShowOrder } from "../../actions/orders-actions";
import { useParams } from "react-router-dom";
import OrderCard from "./orderCards/OrderCard";
import EmptyOrders from "../admin/pages/EmptyOrders";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startShowOrder(id));
  }, []);

  const orders = useSelector(state => {
    return state.orders.orders;
  });

  return (
    <Container sx={{ padding: "1.5rem 0" }}>
      {orders.length > 0 ? (
        orders?.map(el => {
          return <OrderCard {...el} key={el._id} />;
        })
      ) : (
        <EmptyOrders />
      )}
    </Container>
  );
};

export default UserOrders;
