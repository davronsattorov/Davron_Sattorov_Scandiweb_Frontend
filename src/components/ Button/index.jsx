import React, { Component } from "react";
import "./index.css";

export default class Button extends Component {
  render() {
    const {
      size = "lg",
      style = "primary",
      className,
      children,
      ...rest
    } = this.props;

    return (
      <button className={`btn btn-${size} ${style}`} {...rest}>
        {children}
      </button>
    );
  }
}
