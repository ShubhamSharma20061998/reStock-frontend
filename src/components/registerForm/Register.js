import React, { useMemo, useState } from "react";
import { Button, Grid, TextField, Stack, Container } from "@mui/material";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUser } from "../../actions/users-action";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const selectedUserData = useSelector(state => state.users.serverErrors);
  const data = useMemo(() => selectedUserData, [selectedUserData]);
  const redirect = () => {
    navigate("/");
  };
  const formReset = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  // const theme = useTheme();
  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
    };
    dispatch(startRegisterUser(formData, formReset, redirect));
  };
  const textfields = [
    {
      id: "outlined-basic",
      label: "Username",
      variant: "outlined",
      className: styles.inputField,
      value: username,
      stateChanger: setUsername,
      error: data.find(error => error.path === "username"),
    },
    {
      id: "outlined-basic",
      label: "Email",
      variant: "outlined",
      className: styles.inputField,
      value: email,
      stateChanger: setEmail,
      error: data.serverErrors.find(error => error.path === "email"),
    },
    {
      id: "outlined-basic",
      label: "Password",
      variant: "outlined",
      className: styles.inputField,
      value: password,
      stateChanger: setPassword,
      error: data.serverErrors.find(error => error.path === "password"),
    },
  ];

  return (
    <Container>
      <div className={styles.container}>
        <Stack className={styles.formContainer} direction={"row"}>
          <Grid
            container
            md={6}
            sm={6}
            direction={"column"}
            className={styles.registrationForm}
          >
            <Grid item textAlign={"center"}>
              <h1 className={styles.heading_h1}>Welcome</h1>
              <h3 style={{ color: "#2196f3" }}>Register new account</h3>
            </Grid>
            {textfields.map(
              (
                { id, label, variant, className, value, stateChanger, error },
                index
              ) => {
                return (
                  <Grid item key={index}>
                    <TextField
                      id={id}
                      variant={variant}
                      label={label}
                      className={className}
                      value={value}
                      onChange={e => stateChanger(e.target.value)}
                      error={Boolean(error)}
                      helperText={error ? error.msg : ""}
                    />
                  </Grid>
                );
              }
            )}
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ background: "primary.main" }}
                className={styles.submitButton}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Grid container md={6} sm={6}>
            <div item className={styles.registrationSideImage}></div>
          </Grid>
        </Stack>
      </div>
    </Container>
  );
};

export default Register;
