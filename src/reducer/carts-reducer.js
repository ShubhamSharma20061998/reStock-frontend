/**
 * Reducer function for the cart state in the application.
 * @param {Object} state - The current state of the cart.
 * @param {Object} action - The action object that contains the type and payload.
 * @returns The updated state based on the action type.
 */
const initialValues = {
  selectedItems: [],
  serverErrors: [],
  message: {},
};

export const cartReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "CREATE_CART_ITEM": {
      // return {
      //   ...state,
      //   selectedItems: state.selectedItems.map(el => {
      //     if (el._id == action.payload._id) {
      //       return { ...el, quantity: el.quantity + 1 };
      //     } else {
      //       return {...el}
      //     }
      //   }),
      // };
      const item = state.selectedItems.findIndex(
        el => el._id == action.payload._id
      );
      if (item >= 0) {
        return {
          ...state,
          // selectedItems: (state.selectedItems[item].quantity += 1),
          selectedItems: state.selectedItems.map(el => {
            return {
              ...el,
              quantity: Number(el.quantity) + Number(action.payload.quantity),
            };
          }),
        };
      } else {
        return {
          ...state,
          selectedItems: state.selectedItems.concat(action.payload),
        };
      }
    }
    case "LIST_CART_ITEMS": {
      return {
        ...state,
        selectedItems: action.payload,
      };
    }
    case "DELETE_CART_ITEM": {
      return {
        ...state,
        selectedItems: state.selectedItems.filter(el => {
          return el._id != action.payload;
        }),
      };
    }
    case "GET_MESSAGE": {
      return {
        ...state,
        message: action.payload,
      };
    }
    case "INCREASE_QUANTITY": {
      return {
        ...state,
        selectedItems: state.selectedItems.map(el => {
          if (el._id == action.payload._id) {
            return { ...el, quantity: Number(el.quantity) + 1 };
          } else {
            return { ...el };
          }
        }),
      };
    }
    case "DECREASE_QUANTITY": {
      return {
        ...state,
        selectedItems: state.selectedItems.map(el => {
          if (el._id == action.payload._id) {
            return { ...el, quantity: Number(el.quantity) - 1 };
            // return { el: action.payload };
          } else {
            return { ...el };
          }
        }),
      };
    }
    case "REMOVE_CART_ITEM": {
      return {
        ...state,
        selectedItems: state.selectedItems.filter(el => {
          return el._id != action.payload;
        }),
      };
    }
    case "EMPTY_CART": {
      return {
        selectedItems: [],
        serverErrors: [],
        message: {},
      };
    }
    default: {
      return { ...state };
    }
  }
};
