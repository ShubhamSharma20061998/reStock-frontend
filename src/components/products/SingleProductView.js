import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AddToCart from "../addToCartBtn/AddToCart";
import Spinner from "../spinner/Spinner";
import { startGetProducts } from "../../actions/products-action";
import {
  startAddItemsToCart,
  startCartItemsListing,
} from "../../actions/cart-actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProductView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const product_id = location.state?.id;
  useEffect(() => {
    dispatch(startGetProducts());
    dispatch(startCartItemsListing());
  }, []);
  const data = useSelector(state => {
    return state.products.products?.find(el => el._id == product_id);
  });
  const message = useSelector(state => {
    return state.cart.message;
  });
  const notify = message =>
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleAddToCart = useCallback(() => {
    dispatch(startAddItemsToCart(data._id));
    if (message) {
      notify(message);
    }
  });

  return data ? (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Grid container>
        <Card sx={{ display: "flex" }}>
          <Grid item sm={12} md={6}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {`${data.title[0].toUpperCase()}${data.title.slice(1)}`}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {data.brandName}
              </Typography>
              <Typography variant="body1" component="div">
                {data.description}
              </Typography>
            </CardContent>
            <CardActions>
              <AddToCart
                handleAddToCart={handleAddToCart}
                endIcon={<ShoppingCartRoundedIcon />}
              />
            </CardActions>
          </Grid>
          <Grid item sm={12} md={6}>
            <CardMedia
              component="img"
              image={data.images[0].url}
              alt="Live from space album cover"
            />
          </Grid>
        </Card>
      </Grid>
    </Container>
  ) : (
    <Spinner />
  );
};

export default SingleProductView;
