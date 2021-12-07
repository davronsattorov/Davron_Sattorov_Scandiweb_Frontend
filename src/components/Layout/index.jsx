import React, { Component } from "react";
import PropsType from "prop-types";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <div>{this.props.navbar}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

Layout.propTypes = {
  navbar: PropsType.node,
  children: PropsType.node,
};
