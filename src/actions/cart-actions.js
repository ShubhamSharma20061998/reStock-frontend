import Axios from "../config/axios";

export const startAddItemsToCart = id => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/api/create-cart/${id}`);
      if (response.status == 200) {
        dispatch(addCartItems(response.data.cart)); //single object
        dispatch(addCartMessage(response.data.message));
      }
    } catch (err) {
      console.log(err);
      // dispatch(setServerError(err.response.data.errors));
    }
  };
};
const addCartItems = data => {
  return { type: "CREATE_CART_ITEM", payload: data };
};
const addCartMessage = message => {
  return { type: "GET_MESSAGE", payload: message };
};

export const startCartItemsListing = () => {
  return async dispatch => {
    try {
      const response = await Axios.get("/api/getCartItems");
      if (response.status == 200) {
        dispatch(cartItemsListing(response.data.cartItems));
        dispatch(addCartMessage(response.data.message));
      }
    } catch (err) {
      console.log(err.response.data.errors);
      dispatch(setServerError(err.response.data.errors));
    }
  };
};

const cartItemsListing = data => {
  return { type: "LIST_CART_ITEMS", payload: data };
};

const setServerError = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};

export const startQuantityIncreament = id => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/api/increase_quantity/${id}`);
      if (response.status == 200) {
        dispatch(increase_quantity(response.data));
      }
    } catch (err) {
      console.log(err);
      // dispatch(setServerError(err.response.data.errors));
    }
  };
};
const increase_quantity = data => {
  return { type: "INCREASE_QUANTITY", payload: data };
};
export const startQuantityDecrement = id => {
  return async dispatch => {
    try {
      const response = await Axios.post(`/api/decrease_quantity/${id}`);
      if (response.status == 200) {
        dispatch(decrease_quantity(response.data));
      }
    } catch (err) {
      console.log(err);
      // dispatch(setServerError(err.response.data.errors));
    }
  };
};
const decrease_quantity = data => {
  return { type: "DECREASE_QUANTITY", payload: data };
};
export const startDeleteItem = id => {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/api/remove-item/${id}`);
      if (response.status == 200) {
        dispatch(deleteItem(id));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const deleteItem = id => {
  return { type: "DELETE_CART_ITEM", payload: id };
};
