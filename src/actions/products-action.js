import axios from "../config/axios";

export const startGetProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/api/getProducts");
      dispatch(getAllProducts(response.data));
    } catch (err) {
      dispatch(setServerError(err.response.data.errors));
    }
  };
};

const getAllProducts = data => {
  return { type: "GET_PRODUCTS", payload: data };
};

const setServerError = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};

export const startCreateProduct = ({ formData, resetForm, navigate }) => {
  return async dispatch => {
    try {
      const response = await axios.post("/api/create_product", formData);
      if (response.status == 200) {
        dispatch(addProduct(response.data));
        resetForm();
        // navigate(`/product/${response.data.product}`, {
        //   state: { message: response.data.message },
        // });
      }
    } catch (error) {
      console.log(error);
      // dispatch(setServerError(error.response.data.errors));
    }
  };
};
const addProduct = data => {
  return { type: "ADD_PRODUCT", payload: data };
};
