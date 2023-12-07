import Axios from "../config/axios";

export const startShopRegistration = ({ formData, resetForm, navigate }) => {
  return async dispatch => {
    try {
      const response = await Axios.post("/api/create_shop", formData);
      if (response.status == 200) {
        dispatch(add_shop(response.data.newShop));
        resetForm();
        navigate(`/shop/${response.data.newShop._id}`);
      }
    } catch (err) {
      dispatch(setServerErrors(err.response.data.errors));
    }
  };
};
const add_shop = data => {
  return { type: "ADD_SHOP", payload: data };
};
const setServerErrors = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};
export const startShopsListing = () => {
  return async dispatch => {
    try {
      const response = await Axios.get("/api/getShops");
      if ((response.status = 200)) {
        dispatch(setShops(response.data));
      }
    } catch (err) {
      dispatch(setServerErrors(err.response.data.errors));
    }
  };
};
const setShops = data => {
  return { type: "GET_ALL_SHOPS", payload: data };
};

export const startShopDelete = id => {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/api/delete_user/${id}`);
      if (response.status == 200) {
        dispatch(removeUser(id));
      }
    } catch (err) {
      console.log(err);
      // dispatch(setServerErrors(err.response.data.errors));
    }
  };
};
const removeUser = id => {
  return { type: "REMOVE_USER", payload: id };
};
