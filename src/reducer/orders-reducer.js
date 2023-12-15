const initialState = {
  orders: [],
  serverErrors: [],
  ownerPendingOrders: [],
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_ORDERS": {
      return { ...state, orders: [...state.orders, ...action.payload] };
    }
    case "ORDER_ACCEPTED": {
      return {
        ...state,
        owner: state.orders.map(el => {
          if (el._id == action.payload._id) {
            return { ...el, status: action.payload.status };
          } else {
            return { ...el };
          }
        }),
        ownerPendingOrders: state.ownerPendingOrders.filter(
          el => el._id != action.payload._id
        ),
      };
    }
    case "REJECT_ORDER": {
      return {
        ...state,
        order: state.orders.filter(el => el._id != action.payload._id),
        ownerPendingOrders: state.ownerPendingOrders.filter(
          el => el._id != action.payload._id
        ),
      };
    }
    case "RECEIVED_ORDERS": {
      return { ...state, ownerPendingOrders: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
