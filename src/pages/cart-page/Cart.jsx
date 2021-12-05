import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import ImgPreview from "../../components/Card/ImgPreview";
import ProductSizes from "../../components/ProductSizes";
import showPrice from "../../functions/showPrice";
import {
  addItem,
  clearCart,
  reduceItemQuantity,
  removeItem,
} from "../../redux/actions/cartActions";
import stl from "./index.module.css";

class Cart extends Component {
  render() {
    const { selectedCurrency, cartItems } = this.props;
    const history = createBrowserHistory();

    return (
      <div className={stl.container}>
        <h1>CART</h1>

        <div className={stl.items}>
          {cartItems.length
            ? cartItems.map((item, index) => (
                <>
                  <hr />
                  <div
                    className={stl.item}
                    onClick={() => {
                      history.push(
                        `/home/categories/${item.category}/${item.id}`
                      );
                      window.location.reload(false);
                    }}
                  >
                    <div className={stl.item_info}>
                      <p>{item.name}</p>
                      <p className={stl.price}>
                        {showPrice(item.prices, selectedCurrency)}
                      </p>
                      <p className={stl.size}>
                        {item.attributes?.map(({ name, items }) => (
                          <ProductSizes
                            size="sm"
                            showName={false}
                            name={name}
                            items={items}
                            selectedAttributes={item.selectedAttributes}
                          />
                        ))}
                      </p>
                    </div>
                    <div
                      className={stl.controllers_container}
                      onClick={(e) => e.stopPropagation()}
                    >
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
                      <ImgPreview gallery={item.gallery} />
                    </div>
                  </div>
                </>
              ))
            : "Empty"}
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
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    reduceItemQuantity: (item) => dispatch(reduceItemQuantity(item)),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
