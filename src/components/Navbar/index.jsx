import React, { Component } from "react";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import stl from "./index.module.css";
import { emptyCart, logo } from "../../assets/icons";
import { toggleCart } from "../../redux/actions/cartActions";
import { GET_CATEGORIES } from "../../graphql/queries";
import { client } from "../../App";

const activeTabStyle = {
  fontWeight: "600",
  color: "#5ece7b",
};

const history = createBrowserHistory();

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      activeTab: "",
      categories: [],
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

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.props.match.params;

    if (prevProps.match.params.type !== type) {
      this.setState({ type });
      console.log("sd");
    }
  }

  render() {
    const { type } = this.props.match.params;

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
                {this.state.type === name && (
                  <div className={stl.underline}></div>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className={stl.logo} onClick={refreshPage}>
          {logo}
        </div>
        <div>
          <div className={stl.cart_logo} onClick={this.props.handleCartModal}>
            <span>{emptyCart}</span>
            <span className={stl.items_number}>
              {this.props.cartItems.reduce(
                (acc, curr) => acc + curr.quantity,
                0
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isModalOpen, cartItems } = state.cart;
  return {
    isModalOpen,
    cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCartModal: () => dispatch(toggleCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
