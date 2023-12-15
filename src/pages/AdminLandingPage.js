import React from "react";
import { Container, Grid } from "@mui/material";
import ShopsTable from "../components/shops/ShopsTable";
import AdminNav from "../components/admin/admin-nav/AdminNav";
import styles from "./AdminLanding.module.css";

const AdminLandingPage = () => {
  return (
    <>
      <AdminNav />
      <Container>
        <Grid container>
          <Grid item className={styles.picTableContainer} md={12} xs={12}>
            <ShopsTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminLandingPage;
