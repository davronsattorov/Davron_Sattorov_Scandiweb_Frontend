import React, { Component } from "react";
import "./index.css";

export default class Button extends Component {
  render() {
    const { size, style, className, children, ...rest } = this.props;

    return (
      <button className="btn" {...rest}>
        {children}
      </button>
    );
  }
}
