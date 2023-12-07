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
  startDeleteItem,
  startQuantityDecrement,
  startQuantityIncreament,
} from "../../actions/cart-actions";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Spinner from "../spinner/Spinner";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCartItemsListing());
  }, []);

  const rows = useSelector(state => {
    return state.cart.selectedItems;
  });
  const subTotal = useMemo(() => {
    return rows.reduce((acc, cv) => {
      acc += cv.quantity * cv.productID.price;
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

  return (
    <>
      {rows.length > 0 ? (
        <Container>
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
                {rows?.map(el => (
                  <TableRow key={el._id}>
                    <TableCell>
                      {el.productID.title} - {el.productID.description}
                    </TableCell>
                    <TableCell align="right">{el.productID.price}</TableCell>
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
                    <TableCell align="right">{el.productID.unitType}</TableCell>
                    <TableCell align="right">
                      {sum(el.quantity, el.productID.price)}
                    </TableCell>
                  </TableRow>
                ))}
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
          >
            Checkout
          </Button>
        </Container>
      ) : (
        <>
          <h1>Cart is empty.</h1>
        </>
      )}
    </>
  );
};

export default memo(Cart);
