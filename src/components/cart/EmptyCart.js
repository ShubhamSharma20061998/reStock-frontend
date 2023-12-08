import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import emptyCart from "../../assets/undraw_empty_cart_co35.svg";
import styles from "./EmptyCart.module.css";
import { useNavigate } from "react-router-dom";

const EmptyCart = props => {
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    navigate(`/landingPage`);
  };

  return (
    <Container>
      <Paper elevation={3} className={styles.contentContainer}>
        <Grid container>
          <Grid item className={styles.imageContainer}>
            <img
              src={emptyCart}
              alt="Empty Cart"
              className={styles.emptyCartImage}
            />
          </Grid>
          <Grid item className={styles.textContent}>
            <p className={styles.cartText}>Cart is Empty !</p>
            <Button variant="contained" onClick={handleEmptyCart}>
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EmptyCart;
