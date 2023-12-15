const initialState = {
  loggedInUser: {},
  serverErrors: [],
  usersListing: [],
  message: {},
  isLoading: true,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "ACTIVE_USER": {
      return { ...state, loggedInUser: action.payload };
    }
    case "SET_SERVER_ERRORS": {
      return { ...state, serverErrors: action.payload };
    }
    case "GET_USERS_LIST": {
      return { ...state, usersListing: action.payload };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        message: action.payload.message,
        usersListing: state.usersListing.map(el => {
          if (el._id == action.payload.user._id) {
            return { ...el, ...action.payload.user };
          } else {
            return { ...el };
          }
        }),
      };
    }
    default: {
      return { ...state };
    }
  }
}
