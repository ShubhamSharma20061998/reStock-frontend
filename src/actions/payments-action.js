import Axios from "../config/axios";

export const startPayments = (lineItems, totalAmount, email) => {
  return async dispatch => {
    try {
      const response = await Axios.post("/api/payment", {
        lineItems,
        totalAmount,
        email,
      });
      console.log(response.data);
      if (response.status == 200) {
        window.location = response.data.url;
      }
    } catch (err) {
      console.log(err);
      dispatch(setServerErrors(err.response.data.errors));
    }
  };
};

export const startDeletePayment = id => {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/api/payment/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
};

export const startListingPayments = () => {
  return async dispatch => {
    try {
      const response = await Axios.get("/api/payment");
      if (response.status == 200) {
        dispatch(failedPayment(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const failedPayment = data => {
  return { type: "LIST_PAYMENT", payload: data };
};

export const startPaymentUpdate = id => {
  return async dispatch => {
    try {
      await Axios.put(`/api/payment/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
};

const paymentUpdation = data => {
  return { type: "PAYMENT_UPDATE", payload: data };
};

const setServerErrors = data => {
  return { type: "SET_SERVER_ERRORS", payload: data };
};
