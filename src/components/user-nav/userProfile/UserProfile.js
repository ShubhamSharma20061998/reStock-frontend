import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  startFetchUserList,
  startUpdateUser,
} from "../../../actions/users-action";
import Spinner from "../../spinner/Spinner";
import * as Yup from "yup";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    dispatch(startFetchUserList());
  }, []);

  const data = useSelector(state => state.users.usersListing);
  const userInfo = data.find(el => el._id == id);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo?.username);
      setEmail(userInfo?.email);
    }
  }, [userInfo]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {
      username,
      email,
    };
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // If validation is successful, clear formErrors
      setFormErrors([]);
      // Perform other actions like dispatching an action or making an API call
      if (formErrors) {
        dispatch(startUpdateUser(userInfo._id, formData));
      }
      setIsEdit(false);
    } catch (validationErrors) {
      // If validation fails, set formErrors to the array of error messages
      const errorMessages = validationErrors.errors;
      setFormErrors(errorMessages);
      console.log("Form validation errors:", errorMessages);
    }
  };

  const doNothing = e => {
    e.preventDefault();
    setIsEdit(true);
  };

  return data ? (
    <Container className={styles.mainContainer}>
      <Card raised className={styles.formCard}>
        <Container className={styles.innerContainer}>
          <form onSubmit={isEdit ? handleSubmit : doNothing}>
            <FormControl className={styles.formControl}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{ sx: { borderRadius: "0.5rem" } }}
                    fullWidth
                    value={username}
                    error={Boolean(formErrors[0])}
                    helperText={Boolean(formErrors[0]) ? formErrors[0] : ""}
                    id="Username"
                    onChange={e => setUsername(e.target.value)}
                    label="Username"
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{ sx: { borderRadius: "0.5rem" } }}
                    fullWidth
                    error={Boolean(formErrors[1])}
                    value={email}
                    helperText={Boolean(formErrors[1]) ? formErrors[1] : ""}
                    id="Email"
                    onChange={e => setEmail(e.target.value)}
                    label="Email"
                    disabled={!isEdit}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit">
                    {isEdit ? "Submit" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Container>
      </Card>
    </Container>
  ) : (
    <Spinner />
  );
};

export default UserProfile;
