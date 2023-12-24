import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startFetchUserList } from "../../actions/users-action";
import { startShopRegistration } from "../../actions/shops-actions";
import boarding from "../../assets/onboarding.svg";
import styles from "./ShopRegisterForm.module.css";

const ShopRegisterForm = () => {
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
  const navigate = useNavigate();
  const formValidationSchema = Yup.object().shape({
    shopName: Yup.string().required("title is required"),
    ownerFirstName: Yup.string().required("content is required"),
    shopName: Yup.string().required("Shop name is required"),
    ownerFirstName: Yup.string().required("Owner first name is required"),
    ownerLastName: Yup.string().required("Owner last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string().required("Contact number is required"),
    alternateContact: Yup.string().required(
      "Alternate contact number is required"
    ),
    shopAddress: Yup.array().of(
      Yup.object().shape({
        fullAddress: Yup.string().required("Full address is required"),
        pincode: Yup.string().required("Pincode is required"),
        landmark: Yup.string(),
        shopContact: Yup.string().required("Shop contact is required"),
      })
    ),
    gstNo: Yup.string().required("GstNo is required"),
    owner: Yup.string().required("Owner is required"),
  });

  const formik = useFormik({
    initialValues: {
      shopName: "",
      ownerFirstName: "",
      ownerLastName: "",
      email: "",
      contact: "",
      alternateContact: "",
      shopAddress: [
        {
          fullAddress: "",
          pincode: "",
          landmark: "",
          shopContact: "",
        },
      ],
      gstNo: "",
      owner: "",
    },
    validationSchema: formValidationSchema,
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      await dispatch(startShopRegistration({ formData, resetForm, navigate }));
    },
  });
  const textfields = [
    {
      variant: "outlined",
      label: "Shop Name",
      name: "shopName",
      value: formik.values.shopName,
      serverError: stateServerErrors.find(error => error.path === "shopName"),
      formikError: formik.errors.shopName,
    },
    {
      variant: "outlined",
      label: "First Name",
      name: "ownerFirstName",
      value: formik.values.ownerFirstName,
      serverError: stateServerErrors.find(
        error => error.path === "ownerFirstName"
      ),
      formikError: formik.errors.ownerFirstName,
    },
    {
      variant: "outlined",
      label: "Last Name",
      name: "ownerLastName",
      value: formik.values.ownerLastName,
      serverError: stateServerErrors.find(
        error => error.path === "ownerLastName"
      ),
      formikError: formik.errors.ownerLastName,
    },
    {
      variant: "outlined",
      label: "Email",
      name: "email",
      value: formik.values.email,
      serverError: stateServerErrors.find(error => error.path === "email"),
      formikError: formik.errors.email,
    },
    {
      id: "outlined-basic",
      label: "Contact",
      name: "contact",
      value: formik.values.contact,
      serverError: stateServerErrors.find(error => error.path === "contact"),
      formikError: formik.errors.contact,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Alternate Contact",
      name: "alternateContact",
      value: formik.values.alternateContact,
      serverError: stateServerErrors.find(
        error => error.path === "alternateContact"
      ),
      formikError: formik.errors.alternateContact,
      variant: "outlined",
    },
    {
      variant: "outlined",
      label: "Full Address",
      name: "shopAddress[0].fullAddress",
      value: formik.values.shopAddress[0].fullAddress,
      serverError: stateServerErrors.find(
        error => error.path === "shopAddress[0].fullAddress"
      ),
      formikError: formik.errors.shopAddress?.[0]?.fullAddress,
    },
    {
      variant: "outlined",
      label: "Pincode",
      name: "shopAddress[0].pincode",
      value: formik.values.shopAddress[0].pincode,
      serverError: stateServerErrors.find(
        error => error.path === "shopAddress[0].pincode"
      ),
      formikError: formik.errors.shopAddress?.[0]?.pincode,
    },
    {
      id: "outlined-basic",
      label: "Landmark",
      name: "shopAddress[0].landmark",
      value: formik.values.shopAddress[0].landmark,
      serverError: stateServerErrors.find(
        error => error.path === "shopAddress[0].landmark"
      ),
      formikError: formik.errors.shopAddress?.[0]?.landmark,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Shop Contact",
      name: "shopAddress[0].shopContact",
      value: formik.values.shopAddress[0].shopContact,
      serverError: stateServerErrors.find(
        error => error.path === "shopContact[0].shopContact"
      ),
      formikError: formik.errors.shopAddress?.[0]?.shopContact,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "GstNo",
      name: "gstNo",
      value: formik.values.gstNo,
      serverError: stateServerErrors.find(error => error.path === "gstNo"),
      formikError: formik.errors.gstNo,
      variant: "outlined",
    },
  ];
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 2rem",
          position: "relative",
          borderRadius: "1rem",
        }}
      >
        <img src={boarding} alt="boarding" className={styles.boardingImage} />
        <Typography variant="h5" textAlign={"center"} marginBottom={"2rem"}>
          Shop Registeration Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent={"center"} gap={"0 1rem"}>
            {textfields?.map(
              (
                { variant, label, name, value, serverError, formikError },
                index
              ) => {
                return (
                  <Grid item key={index} sm={5} xs={12}>
                    <TextField
                      InputProps={{ sx: { borderRadius: "0.5rem" } }}
                      fullWidth
                      variant={variant}
                      label={label}
                      name={name}
                      value={value}
                      onChange={formik.handleChange}
                      error={Boolean(serverError) || Boolean(formikError)}
                      helperText={
                        Boolean(serverError) || Boolean(formikError)
                          ? formikError || serverError.msg
                          : ""
                      }
                    />
                  </Grid>
                );
              }
            )}
            <Grid item sm={5} xs={12}>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Username"
                defaultValue="Select"
                value={formik.values.owner}
                name="owner"
                onChange={formik.handleChange}
                error={Boolean(formik.errors.owner)}
                helperText={
                  Boolean(formik.errors.owner)
                    ? formik.errors.owner
                    : "Please select username"
                }
              >
                {data?.map(el => {
                  return (
                    <MenuItem key={el._id} value={el._id}>
                      {el.username}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item sm={4} xs={6}>
              <Button variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ShopRegisterForm;
