import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";

const SingleShop = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);

  const data = useSelector(state => {
    return state.shops.shopsList?.find(el => {
      return el._id == id;
    });
  });

  const [shopName, setShopName] = useState(
    Boolean(data.shopName) ? data.shopName : ""
  );
  const [ownerFirstName, setownerFirstName] = useState(
    Boolean(data.ownerFirstName) ? data.ownerFirstName : ""
  );
  const [ownerLastName, setownerLastName] = useState(
    Boolean(data.ownerLastName) ? data.ownerLastName : ""
  );
  const [email, setemail] = useState(Boolean(data.email) ? data.email : "");
  const [contact, setcontact] = useState(
    Boolean(data.contact) ? data.contact : ""
  );
  const [alternateContact, setalternateContact] = useState(
    Boolean(data.alternateContact) ? data.alternateContact : ""
  );
  const [gstNo, setgstNo] = useState(Boolean(data.gstNo) ? data.gstNo : "");

  const handleChange = e => {
    if (e.target.name == "shopName") {
      setShopName(e.target.value);
    } else if (e.target.name == "ownerFirstName") {
      setownerFirstName(e.target.value);
    } else if (e.target.name == "ownerLastName") {
      setownerLastName(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "contact") {
      setcontact(e.target.value);
    } else if (e.target.name == "alternateContact") {
      setalternateContact(e.target.value);
    } else if (e.target.name == "gstNo") {
      setgstNo(e.target.value);
    }
  };

  const textfields = [
    {
      variant: "outlined",
      label: "Shop Name",
      name: "shopName",
      value: shopName,
      // serverError: stateServerErrors.find(error => error.path === "shopName"),
      // formikError: formik.errors.shopName,
    },
    {
      variant: "outlined",
      label: "First Name",
      name: "ownerFirstName",
      value: ownerFirstName,
      // serverError: stateServerErrors.find(
      //   error => error.path === "ownerFirstName"
      // ),
      // formikError: formik.errors.ownerFirstName,
    },
    {
      variant: "outlined",
      label: "Last Name",
      name: "ownerLastName",
      value: ownerLastName,
      // serverError: stateServerErrors.find(
      //   error => error.path === "ownerLastName"
      // ),
      // formikError: formik.errors.ownerLastName,
    },
    {
      variant: "outlined",
      label: "Email",
      name: "email",
      value: email,
      // serverError: stateServerErrors.find(error => error.path === "email"),
      // formikError: formik.errors.email,
    },
    {
      id: "outlined-basic",
      label: "Contact",
      name: "contact",
      value: contact,
      // serverError: stateServerErrors.find(error => error.path === "contact"),
      // formikError: formik.errors.contact,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "Alternate Contact",
      name: "alternateContact",
      value: alternateContact,
      // serverError: stateServerErrors.find(
      //   error => error.path === "alternateContact"
      // ),
      // formikError: formik.errors.alternateContact,
      variant: "outlined",
    },
    {
      id: "outlined-basic",
      label: "GstNo",
      name: "gstNo",
      value: gstNo,
      // serverError: stateServerErrors.find(error => error.path === "gstNo"),
      // formikError: formik.errors.gstNo,
      variant: "outlined",
    },
  ];
  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      id: data._id,
      shopName,
      ownerFirstName,
      ownerLastName,
      contact,
      email,
      alternateContact,
    };
  };

  const toggle = e => {
    e.preventDefault();
    setIsEdit(true);
  };

  return (
    <Container>
      <Card
        sx={{ minWidth: 275, padding: "2rem 0", borderRadius: "1rem" }}
        elevation={2}
      >
        <Typography variant="h5" textAlign={"center"} marginBottom={"2rem"}>
          Update Shop
        </Typography>
        <form onSubmit={isEdit ? handleSubmit : toggle}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
          >
            {textfields?.map(
              ({ variant, label, name, value, serverError }, index) => {
                return (
                  <Grid item key={index} md={5}>
                    <TextField
                      InputProps={{ sx: { borderRadius: "0.5rem" } }}
                      disabled={!isEdit}
                      fullWidth
                      variant={variant}
                      label={label}
                      name={name}
                      value={value}
                      onChange={handleChange}
                      // error={Boolean(serverError)}
                      // helperText={Boolean(serverError) ? serverError.msg : ""}
                    />
                  </Grid>
                );
              }
            )}
            <Grid item md={12} textAlign={"center"}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ width: "20rem" }}
              >
                {isEdit ? "Submit" : "Update"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>
  );
};

export default SingleShop;
