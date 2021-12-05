import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCurrency,
  closeCurrency,
  setCurrencies,
} from "../../redux/actions/currencyActions";
import { GET_CURRENCIES } from "../../graphql/queries";
import { client } from "../../App";
import getCurrencySymbol from "../../functions/getCurrencySymbol";
import stl from "./index.module.css";

class CurrencyModal extends Component {
  getCurrencies = () => {
    const { setCurrencies } = this.props;

    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((result) => setCurrencies(result.data.currencies));
  };

  componentDidMount() {
    this.getCurrencies();
  }

  render() {
    const history = createBrowserHistory();

    const { currencies, selectedCurrency, changeCurrency, closeCurrencyModal } =
      this.props;
    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.cart_dropdown}>
        {currencies?.map((currency, index) => (
          <option
            key={index}
            value={currency}
            className={
              selectedCurrency === currency
                ? stl.list_item_active
                : stl.list_item
            }
            onClick={() => {
              changeCurrency(currency);
              closeCurrencyModal();
            }}
          >
            {getCurrencySymbol(currency)} {currency}
          </option>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { currencies, selectedCurrency } = state.currency;

  return {
    currencies,
    selectedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrencies: (input) => dispatch(setCurrencies(input)),
    changeCurrency: (input) => dispatch(changeCurrency(input)),
    closeCurrencyModal: () => dispatch(closeCurrency()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyModal);
