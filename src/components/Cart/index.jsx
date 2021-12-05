import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addItem,
  clearCart,
  closeCart,
  reduceItemQuantity,
  removeItem,
} from "../../redux/actions/cartActions";
import stl from "./index.module.css";
import ImgPreview from "../Card/ImgPreview";
import Button from "../ Button";
import showPrice from "../../functions/showPrice";

class Cart extends Component {
  render() {
    const { selectedCurrency } = this.props;
    const history = createBrowserHistory();

    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.cart_dropdown}>
        <div className={stl.inner_container}>
          <h5>
            My Bag:{" "}
            {this.props.cartItems.reduce(
              (acc, { quantity }) => acc + quantity,
              0
            )}{" "}
            items
          </h5>
          <div className={stl.items}>
            {this.props.cartItems.length
              ? this.props.cartItems.map((item, index) => (
                  <div className={stl.item}>
                    <div className={stl.item_info}>
                      <p>{item.name}</p>
                      <p className={stl.price}>
                        {showPrice(item?.prices, selectedCurrency)}
                      </p>
                    </div>
                    <div className={stl.controllers_container}>
                      <div className={stl.controllers}>
                        <span onClick={() => this.props.addItem(item)}>+</span>
                        {item.quantity}
                        <span
                          onClick={() =>
                            item.quantity > 1
                              ? this.props.reduceItemQuantity(item)
                              : this.props.removeItem(item)
                          }
                        >
                          -
                        </span>
                      </div>
                      <ImgPreview
                        width="105"
                        height="137"
                        gallery={item.gallery}
                      />
                    </div>
                  </div>
                ))
              : "Empty"}
          </div>
          <div className={stl.buttons}>
            <Button
              size="md"
              style="outlined"
              onClick={() => {
                history.push("/home/cart");
                this.props.closeCartModal();
                refreshPage();
              }}
            >
              VIEW BAG
            </Button>
            <Button
              size="md"
              onClick={() => {
                this.props.clearCart();
                this.props.closeCartModal();
              }}
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cartItems } = state.cart;
  const { selectedCurrency } = state.currency;

  return {
    cartItems,
    selectedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeCartModal: () => dispatch(closeCart()),
    clearCart: () => dispatch(clearCart()),
    addItem: (item) => dispatch(addItem(item)),
    reduceItemQuantity: (item) => dispatch(reduceItemQuantity(item)),
    removeItem: (item) => dispatch(removeItem(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
