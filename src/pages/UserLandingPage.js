import React, { useEffect, useMemo, useState } from "react";
import ProductCards from "../components/productsCard/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { startGetProducts } from "../actions/products-action";
import { Container, Grid } from "@mui/material";

const UserLandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetProducts());
  }, [data]);
  const data = useSelector(state => state.products.products);
  return (
    <Container sx={{ display: "flex" }}>
      <Grid container>
        {data?.map((el, index) => {
          return <ProductCards {...el} key={index} />;
        })}
      </Grid>
    </Container>
  );
};

export default UserLandingPage;
