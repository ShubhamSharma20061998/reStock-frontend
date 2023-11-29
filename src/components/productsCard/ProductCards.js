import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const ProductCards = props => {
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
  return (
    <Grid item md={3}>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={images[0].url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCards;
