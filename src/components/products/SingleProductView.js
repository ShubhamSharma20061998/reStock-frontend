import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActions,
  Paper,
  CardActionArea,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AddToCart from "../addToCartBtn/AddToCart";
import Spinner from "../spinner/Spinner";
import { startGetProducts } from "../../actions/products-action";
import {
  startAddItemsToCart,
  startCartItemsListing,
} from "../../actions/cart-actions";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SingleProductView.module.css";

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
  console.log(data);
  const message = useSelector(state => {
    return state.cart.message;
  });
  const notify = message =>
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  const handleAddToCart = useCallback(() => {
    dispatch(startAddItemsToCart(data._id));
    if (message) {
      notify(message);
    }
  });

  return data ? (
    <>
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container className={styles.container}>
        <Card>
          <Grid container>
            <Grid item md={7}>
              <CardActionArea>
                <CardMedia
                  className={styles.productImage}
                  component="img"
                  height="140"
                  image={data.images[0].url}
                  alt={data.title}
                />
              </CardActionArea>
            </Grid>
            <Grid item md={5} className={styles.textContent}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {`${data.title[0].toUpperCase()}${data.title.slice(1)}`}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  {data.brandName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {data.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <span style={{ marginRight: "2rem" }}>
                    Maximum Order - {data.maxOrderUnit}
                  </span>
                  <span>Minimum Order -{data.minOrderUnit}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Unit Type - {data.unitType}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Unit Type - {data.unitType}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  ₹{data.price}
                </Typography>
              </CardContent>
              <CardActions>
                <AddToCart
                  handleAddToCart={handleAddToCart}
                  endIcon={<ShoppingCartRoundedIcon />}
                />
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  ) : (
    <Spinner />
  );
};

export default SingleProductView;
