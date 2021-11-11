import React, { Component } from "react";
import { connect } from "react-redux";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { closeCart } from "../redux/actions/cartActions";

class RouterLayout extends Component {
  render() {
    return (
      <>
        <Layout>{this.props.children}</Layout>
        {this.props.isModalOpen && <Cart />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isModalOpen } = state.cart;
  return {
    isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterLayout);
