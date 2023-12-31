import React, { useState } from "react";
import { Button, Grid, TextField, Stack, Container, Box } from "@mui/material";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startUserLogin } from "../../actions/users-action";
import loginFormImage from "../../assets/undraw_profile_data_re_v81r.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const data = useSelector(state => state.users.serverErrors);
  const setToken = (token, role, userID) => {
    localStorage.clear();
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userID", userID);
  };
  const redirect = () => {
    navigate("/landingPage");
  };
  const resetForm = () => {
    setUsername("");
    setPassword("");
  };
  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      usernameOrEmail,
      password,
    };
    dispatch(startUserLogin(formData, resetForm, redirect, setToken));
  };
  const textfields = [
    {
      id: "username",
      label: "Username",
      variant: "outlined",
      className: styles.inputField,
      stateHandler: setUsername,
      value: usernameOrEmail,
      error: data?.find(error => error.path === "usernameOrEmail"),
    },
    {
      id: "password",
      label: "Password",
      variant: "outlined",
      className: styles.inputField,
      stateHandler: setPassword,
      value: password,
      error: data?.find(error => error.path === "password"),
      type: "password",
    },
  ];
  return (
    <>
      <Container>
        <Box className={styles.container}>
          <Stack className={styles.formContainer} direction={"row"}>
            <Grid container>
              <Grid item className={styles.loginImageContainer}>
                <img src={loginFormImage} alt="loginImage" />
              </Grid>
            </Grid>
            <Grid
              container
              direction={"column"}
              className={styles.registrationForm}
              spacing={2}
            >
              <Grid item textAlign={"center"}>
                <h1 className={styles.heading_h1}>Welcome</h1>
                <h3 style={{ color: "#6C63FF" }}>Login to continue</h3>
              </Grid>
              {textfields.map(
                (
                  {
                    id,
                    label,
                    variant,
                    className,
                    error,
                    value,
                    type,
                    stateHandler,
                  },
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
                        onChange={e => stateHandler(e.target.value)}
                        error={Boolean(error)}
                        helperText={Boolean(error) ? error.msg : ""}
                        fullWidth
                        type={type || "text"}
                      />
                    </Grid>
                  );
                }
              )}
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ background: "#FF6584" }}
                  className={styles.submitButton}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;
