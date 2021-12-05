import {
  TOGGLE_CURRENCY_MODAL,
  CLOSE_CURRENCY_MODAL,
  SET_CURRENCIES,
  CHANGE_CURRENCY,
  CHANGE_AMOUNT,
} from "../constants";

export const toggleCurrency = () => {
  return {
    type: TOGGLE_CURRENCY_MODAL,
  };
};

export const closeCurrency = () => {
  return {
    type: CLOSE_CURRENCY_MODAL,
  };
};

export const setCurrencies = (item) => {
  return {
    type: SET_CURRENCIES,
    payload: item,
  };
};

export const changeCurrency = (item) => {
  return {
    type: CHANGE_CURRENCY,
    payload: item,
  };
};

export const changeAmount = (item) => {
  return {
    type: CHANGE_AMOUNT,
    payload: item,
  };
};
