const initialState = {
  payment: {},
  allPayments: [],
  serverErrors: [],
};
export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERVER_ERRORS": {
      return {
        ...state,
        serverErrors: action.payload,
      };
    }
    case "LIST_PAYMENT": {
      return {
        ...state,
        payment: action.payload,
      };
    }
    case "ALL_SUCCESS_PAYMENTS": {
      return {
        ...state,
        allPayments: [...state.allPayments, action.payload],
      };
    }
    default: {
      return { ...state };
    }
  }
};
