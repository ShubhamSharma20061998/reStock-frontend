import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ShopsTable from "../components/shops/ShopsTable";
import AdminNav from "../components/admin/admin-nav/AdminNav";
import styles from "./AdminLanding.module.css";
import AdminFooter from "../components/footer/AdminFooter";
import { useDispatch, useSelector } from "react-redux";
import { startShopsListing } from "../actions/shops-actions";

const AdminLandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startShopsListing());
  }, []);

  return (
    <>
      <AdminNav />
      <Container sx={{ padding: "1.5rem" }}>
        <Grid container>
          <Grid item className={styles.picTableContainer} md={12} xs={12}>
            <ShopsTable />
          </Grid>
        </Grid>
      </Container>
      <AdminFooter />
    </>
  );
};

export default AdminLandingPage;
