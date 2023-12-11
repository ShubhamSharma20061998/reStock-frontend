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