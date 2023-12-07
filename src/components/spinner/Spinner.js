import React from "react";
import styles from "./Spinner.module.css";
import { Box, CircularProgress, Container } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Container className={styles.spinner}>
        <CircularProgress />
      </Container>
    </Box>
  );
};

export default Spinner;
