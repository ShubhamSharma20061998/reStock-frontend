const initialValues = {
  shopsList: [],
  serverErrors: [],
  isLoading: true,
};

export const shopsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "ADD_SHOP": {
      return { ...state, shopsList: [...state.shopsList, action.payload] };
    }
    case "GET_ALL_SHOPS": {
      return { ...state, shopsList: action.payload };
    }
    case "SET_SERVER_ERRORS": {
      return { ...state, serverErrors: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
