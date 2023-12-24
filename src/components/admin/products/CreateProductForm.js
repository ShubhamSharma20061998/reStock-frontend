import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import { startCreateProduct } from "../../../actions/products-action";
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import products from "../../../assets/products.svg";
import styles from "./CreateProductForm.module.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateProductForm = () => {
  const dispatch = useDispatch();

  const stateServerErrors = useSelector(state => {
    return state.shops.serverErrors;
  });
  const [images, setImages] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [unitType, setUnitType] = useState("");
  const [stocks, setStocks] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [maxOrderUnit, setMaxOrderUnit] = useState(0);
  const [minOrderUnit, setMinOrderUnit] = useState(0);
  const [price, setPrice] = useState(0);
  const [isNewProducts, setIsNewProducts] = useState(false);
  const [productReleaseDate, setProductReleaseDate] = useState("");

  const navigate = useNavigate();
  // const formValidationSchema = Yup.object().shape({
  //   brandName: Yup.string().required("BrandName is required"),
  //   unitType: Yup.string().required("Unit type is required"),
  //   stocks: Yup.number().required("Stocks is required"),
  //   title: Yup.string().required("Title is required"),
  //   description: Yup.string().required("Description is required"),
  //   rating: Yup.number().required("Rating is required"),
  //   maxOrderUnit: Yup.number().required("Stocks is required"),
  //   minOrderUnit: Yup.number().required("Stocks is required"),
  // });

  const resetForm = () => {
    setBrandName("");
    setUnitType("");
    setStocks("");
    setTitle("");
    setDescription("");
    setRating("");
    setMaxOrderUnit("");
    setMinOrderUnit("");
    setPrice("");
    setCategory("");
    setIsNewProducts(false);
    setProductReleaseDate("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("brandName", brandName);
    newFormData.append("isNewProducts", isNewProducts);
    newFormData.append("productReleaseDate", productReleaseDate);
    newFormData.append("unitType", unitType);
    newFormData.append("stocks", stocks);
    newFormData.append("title", title);
    newFormData.append("description", description);
    newFormData.append("rating", rating);
    newFormData.append("category", category);
    newFormData.append("maxOrderUnit", maxOrderUnit);
    newFormData.append("minOrderUnit", minOrderUnit);
    newFormData.append("price", price);
    images.forEach(file => {
      newFormData.append("images", file);
    });
    dispatch(startCreateProduct({ newFormData, resetForm, navigate }));
  };

  const textfields = [
    {
      variant: "outlined",
      label: "Brand Name",
      name: "brandName",
      value: brandName,
      serverError: stateServerErrors.find(error => error.path === "brandName"),
      stateHandler: setBrandName,
    },
    {
      variant: "outlined",
      label: "Unit Type",
      name: "unitType",
      value: unitType,
      serverError: stateServerErrors.find(error => error.path === "unitType"),
      stateHandler: setUnitType,
    },
    {
      id: "outlined-basic",
      label: "Stocks",
      name: "stocks",
      value: stocks,
      serverError: stateServerErrors.find(error => error.path === "stocks"),
      variant: "outlined",
      type: "number",
      stateHandler: setStocks,
    },
    {
      id: "outlined-basic",
      label: "Title",
      name: "title",
      value: title,
      serverError: stateServerErrors.find(error => error.path === "title"),
      variant: "outlined",
      stateHandler: setTitle,
    },
    {
      variant: "outlined",
      label: "Price",
      name: "price",
      value: price,
      serverError: stateServerErrors.find(error => error.path === "price"),
      variant: "outlined",
      stateHandler: setPrice,
    },
    {
      id: "outlined-basic",
      label: "Description",
      name: "description",
      value: description,
      serverError: stateServerErrors.find(
        error => error.path === "description"
      ),
      variant: "outlined",
      stateHandler: setDescription,
    },
    {
      id: "outlined-basic",
      label: "Rating",
      name: "rating",
      value: rating,
      serverError: stateServerErrors.find(error => error.path === "rating"),
      variant: "outlined",
      stateHandler: setRating,
    },
    {
      id: "outlined-basic",
      label: "Category",
      name: "category",
      value: category,
      serverError: stateServerErrors.find(error => error.path === "category"),
      variant: "outlined",
      stateHandler: setCategory,
    },
    {
      id: "outlined-basic",
      label: "Max Order Units",
      name: "maxOrderUnit",
      value: maxOrderUnit,
      serverError: stateServerErrors.find(
        error => error.path === "maxOrderUnit"
      ),
      variant: "outlined",
      type: "number",
      stateHandler: setMaxOrderUnit,
    },
    {
      type: "number",
      id: "outlined-basic",
      label: "Min Order Unit",
      name: "minOrderUnit",
      value: minOrderUnit,
      serverError: stateServerErrors.find(
        error => error.path === "minOrderUnit"
      ),
      variant: "outlined",
      stateHandler: setMinOrderUnit,
    },
  ];
  const handleImageUpload = images => {
    setImages(images.map(el => el.file));
  };
  return (
    <Container sx={{ position: "relative" }}>
      <img src={products} alt="products" className={styles.productImage} />
      <Card sx={{ padding: "2rem 0", borderRadius: "1rem" }} elevation={2}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h5" textAlign={"center"} marginBottom={"2rem"}>
            Products Registeration Form
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {textfields?.map(
              (
                {
                  variant,
                  label,
                  name,
                  value,
                  serverError,
                  type,
                  helperText,
                  inputProps,
                  rupeeIcon,
                  stateHandler,
                },
                index
              ) => {
                return (
                  <Grid item key={index} sm={5} xs={10}>
                    <TextField
                      fullWidth
                      InputProps={
                        (rupeeIcon
                          ? {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CurrencyRupee />
                                </InputAdornment>
                              ),
                            }
                          : null,
                        { sx: { borderRadius: "0.5rem" } })
                      }
                      type={Boolean(type) ? type : ""}
                      inputProps={
                        Boolean(inputProps)
                          ? {
                              multiple: true,
                            }
                          : {}
                      }
                      variant={variant}
                      label={label}
                      name={name}
                      value={value}
                      onChange={e => stateHandler(e.target.value)}
                      error={Boolean(serverError)}
                      helperText={
                        Boolean(serverError)
                          ? formikError || serverError.msg
                          : helperText
                      }
                    />
                  </Grid>
                );
              }
            )}
            <Grid item sm={10} xs={12}>
              <FilePond
                files={images}
                onupdatefiles={handleImageUpload}
                allowMultiple={true}
                maxFiles={8}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </Grid>
            <Grid item sm={5} xs={10}>
              <FormControlLabel
                control={<Checkbox checked={isNewProducts} />}
                label="New Product"
                name="isNewProducts"
                value={isNewProducts}
                checked={isNewProducts}
                onChange={e => setIsNewProducts(e.target.value)}
              />
            </Grid>
            <Grid item sm={5} xs={10}>
              <input
                type="date"
                name="productReleaseDate"
                value={productReleaseDate}
                onChange={e => setProductReleaseDate(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={8}>
              <Button variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default CreateProductForm;
