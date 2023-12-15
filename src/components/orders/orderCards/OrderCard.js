import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./OrderCard.module.css";
import { useDispatch } from "react-redux";
import { startReceivedOrders } from "../../../actions/orders-actions";

const OrderCard = props => {
  const dispatch = useDispatch();
  const { orderDate, lineItems, functions, _id } = props;

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ marginBottom: "1rem" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Order Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map(el => {
            return (
              <TableRow
                key={el._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={el.item.images[0].url}
                    alt="product image"
                    className={styles.productImage}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{el.item.title}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{el.quantity}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{el.amount}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">{orderDate}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {functions ? (
        <Grid container className={styles.orderStatus}>
          <Grid item md={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                functions.acceptOrder(_id);
              }}
            >
              Accept
            </Button>
          </Grid>
          <Grid item md={3}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => {
                functions.declineOrder(_id);
              }}
            >
              Reject
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </TableContainer>
  );
};

export default OrderCard;
