import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styling from "./ProductCards.module.css";
import { useDispatch, useSelector } from "react-redux";

import AddToCart from "../addToCartBtn/AddToCart";
import { startAddItemsToCart } from "../../actions/cart-actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCards = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    brandName,
    description,
    images,
    isNewProducts,
    maxOrderUnit,
    minOrderUnit,
    price,
    productReleaseDate,
    rating,
    slug,
    stocks,
    title,
    unitType,
    _id,
  } = props;
  const slicedDescription = description.slice(0, 36);
  const message = useSelector(state => {
    return state.cart.message;
  });
  const notify = message =>
    toast(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleAddToCart = useCallback(() => {
    dispatch(startAddItemsToCart(_id));
    if (message) {
      notify(message);
    }
  });
  return (
    <Grid item md={3}>
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
      <Card className={styling.transformCard}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://st2.depositphotos.com/1000128/6688/i/380/depositphotos_66888203-stock-photo-shipping-and-logistics-concept.jpg"
          className={styling.clickableProduct}
          onClick={e =>
            navigate(`/product-view/${slug}`, { state: { id: _id } })
          }
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styling.clickableProduct}
            onClick={e =>
              navigate(`/product-view/${slug}`, { state: { id: _id } })
            }
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styling.clickableProduct}
            onClick={e =>
              navigate(`/product-view/${slug}`, { state: { id: _id } })
            }
          >
            {`${slicedDescription} ...`}
          </Typography>
        </CardContent>
        <CardActions>
          <AddToCart handleAddToCart={handleAddToCart} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCards;
