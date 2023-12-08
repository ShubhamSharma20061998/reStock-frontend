import axios from "axios";
import Axios from "../config/axios";
export const startGetProducts = condition => {
  return async dispatch => {
    try {
      const response = await Axios.get(
        `/api/getProducts?condition=${condition}`
      );
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

export const startCreateProduct = ({ newFormData, resetForm, navigate }) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:3090/api/create_product",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status == 200) {
        dispatch(addProduct(response.data));
        resetForm();
        navigate(`/product/${response.data.product}`, {
          state: { message: response.data.message },
        });
      }
    } catch (error) {
      dispatch(setServerError(error.response.data.errors));
    }
  };
};
const addProduct = data => {
  return { type: "ADD_PRODUCT", payload: data };
};
