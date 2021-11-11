import {
  TOGGLE_CURRENCY_MODAL,
  CLOSE_CURRENCY_MODAL,
  SET_CURRENCIES,
  CHANGE_CURRENCY,
  CHANGE_AMOUNT,
} from "../constants";

const euro = `&euro`;

const INITIAL_STATE = {
  isOpen: false,
  currencies: [],
  selectedCurrency: "",
  selectedAmount: "",
};

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_CURRENCY_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case CLOSE_CURRENCY_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    case SET_CURRENCIES:
      return {
        ...state,
        currencies: payload,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        selectedCurrency: payload,
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        selectedAmount: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
