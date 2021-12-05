import React, { Component } from "react";
import { connect } from "react-redux";
import Cart from "../components/Cart";
import CurrencyModal from "../components/CurrencyModal";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { closeCart } from "../redux/actions/cartActions";
import { closeCurrency } from "../redux/actions/currencyActions";

class RouterLayout extends Component {
  render() {
    return (
      <>
        <Layout>{this.props.children}</Layout>
        {this.props.isCurrencyOpen && <CurrencyModal />}
        {this.props.isModalOpen && <Cart />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isModalOpen } = state.cart;
  const { isCurrencyOpen } = state.currency;

  return {
    isModalOpen,
    isCurrencyOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeCart()),
    closeCurrencyModal: () => dispatch(closeCurrency()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterLayout);
