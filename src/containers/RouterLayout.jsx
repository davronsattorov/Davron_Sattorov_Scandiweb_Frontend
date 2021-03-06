import React, { Component } from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import Cart from "../components/Cart";
import CurrencyModal from "../components/CurrencyModal";
import Layout from "../components/Layout";
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

RouterLayout.propTypes = {
  isCurrencyOpen: PropsType.bool,
  isModalOpen: PropsType.bool,
  children: PropsType.node,
};

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
