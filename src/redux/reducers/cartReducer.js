import {
  TOGGLE_CART_MODAL,
  ADD_ITEM,
  REMOVE_ITEM,
  REDUCE_ITEM_QUANTITY,
  CLEAR_CART,
  CLOSE_CART_MODAL,
} from "../constants";

const INITIAL_STATE = {
  isModalOpen: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_CART_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case CLOSE_CART_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addNewProductToCart(state.cartItems, payload),
      };

    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id),
      };
    case REDUCE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

const addNewProductToCart = (cartItems, cartToAdd) => {
  const isInCart = cartItems.find((cartItem) => cartItem.id === cartToAdd.id);

  if (isInCart) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartToAdd.id
        ? { ...cartToAdd, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...cartToAdd, quantity: 1 }];
};

export default cartReducer;
