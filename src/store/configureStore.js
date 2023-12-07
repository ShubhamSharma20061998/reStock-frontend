import usersReducer from "../reducer/users-reducer";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import productsReducer from "../reducer/productsReducer";
import { shopsReducer } from "../reducer/shops-reducer";
import { cartReducer } from "../reducer/carts-reducer";

const rootReducer = {
  users: usersReducer,
  products: productsReducer,
  shops: shopsReducer,
  cart: cartReducer,
};

export default function configureStore() {
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(thunk)
  );
  return store;
}
