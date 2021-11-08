import React, { Component } from "react";
import { Link } from "react-router-dom";
import stl from "./index.module.css";
import { emptyCart, logo } from "../../assets/icons";

const listItems = [
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Kids",
    value: "kids",
  },
];

const activeTabStyle = {
  fontWeight: "600",
  color: "#5ece7b",
};
export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "women",
    };

    this.handleTabClick = (input) => this.setState({ activeTab: input });
  }

  render() {
    const refreshPage = () => window.location.reload(false);

    return (
      <div className={stl.container}>
        <div>
          <ul className={stl.list}>
            {listItems.map((item) => (
              <div className={stl.list_item}>
                <li
                  style={
                    item.value === this.state.activeTab ? activeTabStyle : {}
                  }
                  onClick={() => this.handleTabClick(item.value)}
                >
                  {item.label}
                </li>
                {item.value === this.state.activeTab && (
                  <div className={stl.underline}></div>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className={stl.logo} onClick={refreshPage}>
          {logo}
        </div>
        <div>{emptyCart}</div>
      </div>
    );
  }
}
