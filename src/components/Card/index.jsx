import React, { Component } from "react";
import { Link } from "react-router-dom";
import { cartIcon } from "../../assets/icons";
import stl from "./index.module.css";

export default class Card extends Component {
  render() {
    const { item } = this.props;

    return (
      <div className={stl.container}>
        {!item.isAvaliable && (
          <div className={stl.disabled_text}>Out of stock</div>
        )}
        <Link
          className={`${stl.list_item} ${
            !item.isAvaliable && stl.disabled_item
          }`}
          to={item.isAvaliable && "/home/product"}
        >
          <img
            src="https://www.w3schools.com/css/paris.jpg"
            alt="Img"
            width="354"
            height="330"
          />
          <p className={stl.title}>{item.title}</p>
          <span className={stl.price}>${item.price}</span>
        </Link>
        {item.isAvaliable && <p className={stl.cart_icon}>{cartIcon}</p>}
      </div>
    );
  }
}
