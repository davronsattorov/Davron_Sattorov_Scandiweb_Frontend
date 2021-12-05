import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import cartReducer from "./cartReducer";
import currencyReducer from "./currencyReducer";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const currencyPersistConfig = {
  key: "currency",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  currency: persistReducer(currencyPersistConfig, currencyReducer),
});

export default rootReducer;
