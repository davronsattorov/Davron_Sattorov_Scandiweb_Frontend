import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { cartIcon } from "../../assets/icons";
import stl from "./index.module.css";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../redux/actions/cartActions";
import showPrice from "../../functions/showPrice";

class Card extends Component {
  render() {
    const { item, selectedCurrency, addItem } = this.props;
    const { type } = this.props.match.params;
    const history = createBrowserHistory();

    const handleClick = (e) => {
      if (item.inStock) {
        history.push(`/home/categories/${type}/${item.id}`);
        refreshPage();
      } else {
        e.preventDefault();
      }
    };

    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.container}>
        {!item?.inStock && (
          <div className={stl.disabled_text}>Out of stock</div>
        )}
        <div
          className={`${stl.list_item} ${!item?.inStock && stl.disabled_item}`}
          onClick={handleClick}
        >
          <img src={item?.gallery[0]} alt="Img" width="354" height="330" />
          <p className={stl.title}>{item?.name}</p>
          <span className={stl.price}>
            {showPrice(item?.prices, selectedCurrency)}
          </span>
        </div>
        {item?.inStock && (
          <p
            className={stl.cart_icon}
            onClick={() =>
              addItem({
                ...item,
                selectedAttributes: {
                  ...item.attributes.reduce(
                    (acc, cur) => ({
                      ...acc,
                      [cur.name]: cur.items[0].value,
                    }),
                    {}
                  ),
                },
              })
            }
          >
            {cartIcon}
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedCurrency } = state.currency;

  return { selectedCurrency };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
