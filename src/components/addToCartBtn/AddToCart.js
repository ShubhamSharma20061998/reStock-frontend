import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddToCart = props => {
  const navigate = useNavigate();
  const { handleAddToCart } = props;
  return (
    <Button
      size="small"
      variant="contained"
      endIcon={props.endIcon}
      onClick={() => {
        handleAddToCart();
      }}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
