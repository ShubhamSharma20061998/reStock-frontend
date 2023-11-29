const initialState = {
  loggedInUser: {},
  serverErrors: [],
  usersListing: [],
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
    default: {
      return { ...state };
    }
  }
}
