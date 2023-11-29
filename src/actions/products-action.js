import axios from "../config/axios";

export const startGetProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/api/getProducts");
      dispatch(getAllProducts(response.data));
    } catch (err) {
      alert(err.message);
      //   dispatch(setServerError(err.response.data.errors));
    }
  };
};

const getAllProducts = data => {
  return { type: "GET_PRODUCTS", payload: data };
};

const setServerError = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};
