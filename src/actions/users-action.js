import axios from "../config/axios";

const loggedInUser = user => {
  return { type: "ACTIVE_USER", payload: user };
};

export const startRegisterUser = (formData, resetForm, redirect) => {
  return async dispatch => {
    try {
      const response = await axios.post("/api/user_register", formData);
      if (response.status == 200) {
        resetForm();
        redirect();
      }
    } catch (err) {
      dispatch(setServerErrors(err.response.data.errors));
    }
  };
};
export const startUserLogin = (formData, resetForm, redirect, setToken) => {
  return async dispatch => {
    try {
      const response = await axios.post("/api/login", formData);
      if (response.status == 200) {
        dispatch(loggedInUser(response.data));
        resetForm();
        redirect();
        setToken(response.data.token, response.data.user.role);
      }
    } catch (err) {
      dispatch(setServerErrors(err.response.data.errors));
    }
  };
};
const setServerErrors = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};

export const startFetchUserList = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/api/getAllUsers");
      if (response.status == 200) {
        dispatch(getAllUsers(response.data));
      }
    } catch (err) {
      dispatch({
        type: "SET_SERVER_ERRORS",
        payload: err.response.data.errors,
      });
    }
  };
};
const getAllUsers = data => {
  return { type: "GET_USERS_LIST", payload: data };
};
