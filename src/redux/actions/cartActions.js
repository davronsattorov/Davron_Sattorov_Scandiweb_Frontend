import {
  TOGGLE_CART_MODAL,
  CLOSE_CART_MODAL,
  ADD_ITEM,
  REMOVE_ITEM,
  REDUCE_ITEM_QUANTITY,
  CLEAR_CART,
} from "../constants";

export const toggleCart = () => {
  return {
    type: TOGGLE_CART_MODAL,
  };
};

export const closeCart = () => {
  return {
    type: CLOSE_CART_MODAL,
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
};

export const reduceItemQuantity = (item) => {
  return {
    type: REDUCE_ITEM_QUANTITY,
    payload: item,
  };
};

export const clearCart = () => ({ type: CLEAR_CART });
