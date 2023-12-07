import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShopsTable from "../components/shops/ShopsTable";
import { useDispatch } from "react-redux";
import { startShopsListing } from "../actions/shops-actions";
const AdminLandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startShopsListing());
  }, []);
  return (
    <Container>
      <Link to={`/registerShop`}>Create Shop</Link>
      <Link to={`/create_product`}>Create product</Link>
      <Grid container>
        <Grid item>
          <ShopsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLandingPage;
