import { Container } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../orders/orderCards/OrderCard";
import {
  startOrderAccept,
  startOrderDeletion,
} from "../../../actions/orders-actions";
import Spinner from "../../spinner/Spinner";
import EmptyOrders from "./EmptyOrders";

const OrdersNotification = () => {
  const dispatch = useDispatch();

  const receivedOrders = useSelector(state => state.orders.ownerPendingOrders);

  const acceptOrder = id => {
    dispatch(startOrderAccept(id));
  };

  const declineOrder = id => {
    dispatch(startOrderDeletion(id));
  };

  return (
    <Container sx={{ padding: "1rem 0" }}>
      {receivedOrders.length > 0 ? (
        receivedOrders?.map(el => {
          return (
            <OrderCard
              {...el}
              key={el._id}
              functions={{ acceptOrder, declineOrder }}
            />
          );
        })
      ) : (
        <EmptyOrders />
      )}
    </Container>
  );
};

export default OrdersNotification;
