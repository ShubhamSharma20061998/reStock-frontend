import Axios from "../config/axios";

export const startOrderCreation = data => {
  return async dispatch => {
    const response = await Axios.post("/api/create-order", data);
    if (response.status == 200) {
      dispatch(createOrder(response.data));
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

const createOrder = data => {
  return { type: "ADD_ORDER", payload: data };
};

export const startShowOrder = id => {
  return async dispatch => {
    try {
      const response = await Axios.get(`/api/orders/${id}`);
      if (response.status == 200) {
        dispatch(showOrders(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const showOrders = data => {
  return { type: "LIST_ORDERS", payload: data };
};

export const startReceivedOrders = () => {
  return async dispatch => {
    try {
      const response = await Axios.get("/api/getPendingOrders");
      if (response.status == 200) {
        dispatch(getReceivedOrders(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const getReceivedOrders = data => {
  return { type: "RECEIVED_ORDERS", payload: data };
};

const setServerError = errors => {
  return { type: "SET_SERVER_ERRORS", payload: errors };
};

export const startOrderAccept = id => {
  return async dispatch => {
    try {
      const response = await Axios.put(`/api/update-order/${id}`);
      if (response.status == 200) {
        dispatch(orderAcceptance(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const orderAcceptance = data => {
  return { type: "ORDER_ACCEPTED", payload: data };
};
export const startOrderDeletion = id => {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/api/reject-order/${id}`);
      if (response.status == 200) {
        dispatch(orderDeletion(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const orderDeletion = data => {
  return { type: "REJECT_ORDER", payload: data };
};
