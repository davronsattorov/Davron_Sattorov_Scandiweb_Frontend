import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default class Button extends Component {
  render() {
    const {
      size = "lg",
      shape = "primary",
      className,
      children,
      ...rest
    } = this.props;

    return (
      <button className={`${className} btn btn-${size} ${shape}`} {...rest}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  size: PropTypes.string,
  shape: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
