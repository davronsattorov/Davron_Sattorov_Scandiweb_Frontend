import React, { Component } from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import stl from "./index.module.css";
import { emptyCart, logo } from "../../assets/icons";
import { closeCart, toggleCart } from "../../redux/actions/cartActions";
import { GET_CATEGORIES } from "../../graphql/queries";
import { client } from "../../App";
import {
  closeCurrency,
  toggleCurrency,
} from "../../redux/actions/currencyActions";
import getCurrencySymbol from "../../functions/getCurrencySymbol";

const activeTabStyle = {
  fontWeight: "600",
  color: "#5ece7b",
  padding: "20px 0",
  borderBottom: "3px solid #5ece7b",
};

const history = createBrowserHistory();

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      activeTab: "",
      categories: [],
      currencies: [],
    };

    this.handleTabClick = (input) => history.push(`/home/categories/${input}`);

    this.getItems = () => {
      client
        .query({
          query: GET_CATEGORIES,
        })
        .then((result) =>
          this.setState({ categories: result.data.categories })
        );
    };
  }

  componentDidMount() {
    let { type } = this.props.match.params;
    this.setState({ type });

    this.getItems();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props.match.params;

    if (prevProps.match.params.type !== type) {
      this.setState({ type });
      console.log("sd");
    }
  }

  render() {
    const {
      cartItems,
      handleCartModal,
      closeCartModal,
      selectedCurrency,
      handleCurrencyModal,
      closeCurrencyModal,
    } = this.props;

    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.container}>
        <div>
          <ul className={stl.list}>
            {this.state.categories?.map(({ name }, index) => (
              <div className={stl.list_item} key={index}>
                <li
                  style={this.state.type === name ? activeTabStyle : {}}
                  onClick={() => {
                    this.handleTabClick(name);
                    refreshPage();
                  }}
                >
                  {name}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className={stl.logo} onClick={refreshPage}>
          {logo}
        </div>
        <div className={stl.modals}>
          <div
            className={stl.cart_logo}
            onClick={() => {
              handleCurrencyModal();
              closeCartModal();
            }}
          >
            <span className={stl.currencySymbol}>
              {getCurrencySymbol(selectedCurrency) || "$"}
            </span>
          </div>
          <div
            className={stl.cart_logo}
            onClick={() => {
              handleCartModal();
              closeCurrencyModal();
            }}
          >
            <span>{emptyCart}</span>
            {cartItems.length ? (
              <span className={stl.items_number}>
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isModalOpen, cartItems } = state.cart;
  const { isCurrencyOpen, selectedCurrency, currencies } = state.currency;

  return {
    isModalOpen,
    cartItems,
    isCurrencyOpen,
    selectedCurrency,
    currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCartModal: () => dispatch(toggleCart()),
    closeCartModal: () => dispatch(closeCart()),
    handleCurrencyModal: () => dispatch(toggleCurrency()),
    closeCurrencyModal: () => dispatch(closeCurrency()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

Navbar.propTypes = {
  match: PropsType.object,
  cartItems: PropsType.array,
  handleCartModal: PropsType.func,
  closeCartModal: PropsType.func,
  selectedCurrency: PropsType.string,
  handleCurrencyModal: PropsType.func,
  closeCurrencyModal: PropsType.func,
};
