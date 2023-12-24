import React, { memo, useEffect, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  startCartItemsListing,
  startClearCart,
  startDeleteItem,
  startQuantityDecrement,
  startQuantityIncreament,
} from "../../actions/cart-actions";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  startDeletePayment,
  startListingPayments,
  startPaymentUpdate,
  startPayments,
} from "../../actions/payments-action";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import EmptyCart from "./EmptyCart";
import _ from "lodash";
import { startOrderCreation } from "../../actions/orders-actions";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCartItemsListing()); // Get the URL search parameters
    dispatch(startListingPayments());
    const searchParams = new URLSearchParams(window.location.search);
    // Access individual parameters
    const success = searchParams.get("success");
    const cancel = searchParams.get("cancel");
    if (success) {
      toast.success("Order has been placed.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (cancel) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, []);

  const rows = useSelector(state => {
    return state.cart.selectedItems;
  });

  const payment = useSelector(state => {
    return state.payments.payment;
  });

  const subTotal = useMemo(() => {
    return rows.reduce((acc, cv) => {
      acc += Number(cv.quantity) * Number(cv.productID.price);
      return acc;
    }, 0);
  }, [rows]);

  const sum = (quantity, price) => {
    return Number(quantity) * Number(price);
  };

  const handleIncrease = id => {
    dispatch(startQuantityIncreament(id));
  };

  const handleDecrease = id => {
    dispatch(startQuantityDecrement(id));
  };

  const handleDelete = id => {
    dispatch(startDeleteItem(id));
  };

  const orderCreation = rows => {
    const orderData = {
      orderDate: `${new Date(rows[0].userID.createdAt)}`,
      orderOwner: rows[0].userID._id,
      lineItems: rows.map(el => {
        return {
          item: el.productID,
          quantity: el.quantity,
          amount: Number(el.quantity) * Number(el.productID.price),
        };
      }),
    };
    return orderData;
  };

  const requestObject = rows => {
    const lineItems = rows.map(el => {
      return {
        price: el.productID.price,
        title: el.productID.title,
        quantity: el.quantity,
        products: el.productID._id,
      };
    });
    return lineItems;
  };

  const handleCheckout = async () => {
    let userEmail = "";
    rows.forEach(el => (userEmail = el.userID.email));
    const lineItems = requestObject(rows);
    dispatch(startPayments(lineItems, subTotal, userEmail));
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Access individual parameters
    const success = searchParams.get("success");
    const cancel = searchParams.get("cancel");
    const ids = rows.map(el => el._id);
    if (!_.isEmpty(payment) && success) {
      dispatch(startPaymentUpdate(payment[0]?.transactionID));
    }
    if (!_.isEmpty(payment) && cancel) {
      dispatch(startDeletePayment(payment[0]?.transactionID));
    }
    if (rows.length > 0 && success) {
      dispatch(startClearCart(ids));
    }
    if (rows.length > 0 && payment.length > 0 && success) {
      dispatch(startOrderCreation(orderCreation(rows)));
    }
  }, [rows]);

  return (
    <>
      {rows.length > 0 ? (
        <Container sx={{ marginBottom: "6rem", minHeight: "44vh" }}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map(el => {
                  return (
                    <TableRow key={el._id}>
                      <TableCell>
                        {el.productID.title} - {el.productID.description}
                      </TableCell>
                      <TableCell align="right">
                        {Number(el.productID.price)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="increase"
                          size="small"
                          onClick={e => {
                            handleIncrease(el._id);
                          }}
                        >
                          <AddOutlinedIcon fontSize="small" />
                        </IconButton>
                        {el.quantity}
                        <IconButton
                          aria-label="decrease"
                          size="small"
                          onClick={e => {
                            el.quantity <= 1
                              ? handleDelete(el._id)
                              : handleDecrease(el._id);
                          }}
                        >
                          <RemoveOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        {el.productID.unitType}
                      </TableCell>
                      <TableCell align="right">
                        {sum(Number(el.quantity), Number(el.productID.price))}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            sx={{ marginTop: "2rem", float: "right" }}
            variant="contained"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Container>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </>
  );
};

export default memo(Cart);
