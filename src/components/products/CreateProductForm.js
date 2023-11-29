import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startFetchUserList } from "../../actions/users-action";
import { startShopRegistration } from "../../actions/shops-actions";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";

const CreateProductForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startFetchUserList());
  }, []);
  const data = useSelector(state => {
    return state.users.usersListing;
  });
  const stateServerErrors = useSelector(state => {
    return state.shops.serverErrors;
  });
  const [images, setImages] = useState("");
  const navigate = useNavigate();
  const formValidationSchema = Yup.object().shape({
    brandName: Yup.string().required("BrandName is required"),
    unitType: Yup.string().required("Unit type is required"),
    stocks: Yup.number().required("Stocks is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    rating: Yup.number().required("Rating is required"),
    maxOrderUnit: Yup.number().required("Stocks is required"),
    minOrderUnit: Yup.number().required("Stocks is required"),
  });

  const formik = useFormik({
    initialValues: {
      brandName: "",
      isNewProducts: false,
      productReleaseDate: "",
      unitType: "",
      stocks: "",
      title: "",
      description: "",
      rating: "",
      category: "",
      maxOrderUnit: "",
      minOrderUnit: "",
      price: "",
    },
    // validationSchema: formValidationSchema,
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      const newFormData = new FormData();
      newFormData.append("brandName", formData.brandName);
      newFormData.append("isNewProducts", formData.isNewProducts);
      newFormData.append("productReleaseDate", formData.productReleaseDate);
      newFormData.append("unitType", formData.unitType);
      newFormData.append("stocks", formData.stocks);
      newFormData.append("title", formData.title);
      newFormData.append("description", formData.description);
      newFormData.append("rating", formData.rating);
      newFormData.append("category", formData.category);
      newFormData.append("maxOrderUnit", formData.maxOrderUnit);
      newFormData.append("minOrderUnit", formData.minOrderUnit);
      newFormData.append("price", formData.price);
      images.forEach(el => {
        Object.values(el.uploadedFiles).forEach(file => {
          newFormData.append(el.name, file);
        });
      });
    },
  });
  const textfields = [
    {
      variant: "outlined",
      label: "Brand Name",
      name: "brandName",
      value: formik.values.brandName,
      serverError: stateServerErrors.find(error => error.path === "brandName"),
      formikError: formik.errors.brandName,
    },
    {
      variant: "outlined",
      label: "Unit Type",
      name: "unitType",
      value: formik.values.unitType,
      serverError: stateServerErrors.find(error => error.path === "unitType"),
      formikError: formik.errors.unitType,
    },
    {
      id: "outlined-basic",
      label: "Stocks",
      name: "stocks",
      value: formik.values.stocks,
      serverError: stateServerErrors.find(error => error.path === "stocks"),
      formikError: formik.errors.stocks,
      variant: "outlined",
      type: "number",
    },
    {
      id: "outlined-basic",
      label: "Title",
      name: "title",
      value: formik.values.title,
      serverError: stateServerErrors.find(error => error.path === "title"),
      formikError: formik.errors.title,
      variant: "outlined",
    },
    {
      variant: "outlined",
      label: "Price",
      name: "price",
      value: formik.values.price,
      serverError: stateServerErrors.find(error => error.path === "price"),
      formikError: formik.errors.price,
      rupeeIcon: true,
    },
    {
      id: "outlined-basic",
      label: "Description",
      name: "description",
      value: formik.values.description,
      serverError: stateServerErrors.find(
        error => error.path === "description"
      ),
      formikError: formik.errors.description,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Rating",
      name: "rating",
      value: formik.values.rating,
      serverError: stateServerErrors.find(error => error.path === "rating"),
      formikError: formik.errors.rating,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Category",
      name: "category",
      value: formik.values.category,
      serverError: stateServerErrors.find(error => error.path === "category"),
      formikError: formik.errors.category,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Max Order Units",
      name: "maxOrderUnit",
      value: formik.values.maxOrderUnit,
      serverError: stateServerErrors.find(
        error => error.path === "maxOrderUnit"
      ),
      formikError: formik.errors.maxOrderUnit,
      variant: "outlined",
      type: "number",
    },
    {
      type: "number",
      id: "outlined-basic",
      label: "Min Order Unit",
      name: "minOrderUnit",
      value: formik.values.minOrderUnit,
      serverError: stateServerErrors.find(
        error => error.path === "minOrderUnit"
      ),
      formikError: formik.errors.minOrderUnit,
      variant: "outlined",
    },
  ];
  const handleFileChange = e => {
    const name = e.target.name;
    const uploadedFiles = e.target.files;
    setImages([...images, { name, uploadedFiles }]);
  };
  return (
    <Container>
      <Grid container>
        <Card>
          <Container>
            <FormControl>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
              >
                {textfields?.map(
                  (
                    {
                      variant,
                      label,
                      name,
                      value,
                      serverError,
                      formikError,
                      type,
                      helperText,
                      inputProps,
                      rupeeIcon,
                    },
                    index
                  ) => {
                    return (
                      <Grid item key={index}>
                        <TextField
                          fullWidth
                          InputProps={
                            rupeeIcon
                              ? {
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CurrencyRupee />
                                    </InputAdornment>
                                  ),
                                }
                              : null
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
                          onChange={formik.handleChange}
                          error={Boolean(serverError) || Boolean(formikError)}
                          helperText={
                            Boolean(serverError) || Boolean(formikError)
                              ? formikError || serverError.msg
                              : helperText
                          }
                        />
                      </Grid>
                    );
                  }
                )}
                <Grid item>
                  <input
                    multiple
                    type="file"
                    value={undefined}
                    name="images"
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox checked={formik.values.isNewProducts} />}
                    label="New Product"
                    name="isNewProducts"
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item>
                  <input
                    type="date"
                    name="productReleaseDate"
                    value={formik.values.productReleaseDate}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" fullWidth type="submit">
                    Submit
                  </Button>
                </Grid>
              </form>
            </FormControl>
          </Container>
        </Card>
      </Grid>
    </Container>
  );
};

export default CreateProductForm;
