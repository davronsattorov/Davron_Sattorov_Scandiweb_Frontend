import React, { Component } from "react";
import PropsType from "prop-types";
import { createBrowserHistory } from "history";
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
    const {
      selectedCurrency,
      cartItems,
      addItem,
      reduceItemQuantity,
      removeItem,
      closeCartModal,
      clearCart,
    } = this.props;
    const history = createBrowserHistory();

    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.cart_dropdown}>
        <div className={stl.inner_container}>
          <h5>
            My Bag: {cartItems.reduce((acc, { quantity }) => acc + quantity, 0)}{" "}
            items
          </h5>
          <div className={stl.items}>
            {cartItems.length
              ? cartItems.map((item, index) => (
                  <div key={index} className={stl.item}>
                    <div className={stl.item_info}>
                      <p>{item.name}</p>
                      <p className={stl.price}>
                        {showPrice(item?.prices, selectedCurrency)}
                      </p>
                    </div>
                    <div className={stl.controllers_container}>
                      <div className={stl.controllers}>
                        <span onClick={() => addItem(item)}>+</span>
                        {item.quantity}
                        <span
                          onClick={() =>
                            item.quantity > 1
                              ? reduceItemQuantity(item)
                              : removeItem(item)
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
              shape="outlined"
              onClick={() => {
                history.push("/home/cart");
                closeCartModal();
                refreshPage();
              }}
            >
              VIEW BAG
            </Button>
            <Button
              size="md"
              onClick={() => {
                clearCart();
                closeCartModal();
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

Cart.propTypes = {
  selectedCurrency: PropsType.string,
  cartItems: PropsType.array,
  addItem: PropsType.func,
  reduceItemQuantity: PropsType.func,
  removeItem: PropsType.func,
  closeCartModal: PropsType.func,
  clearCart: PropsType.func,
};
