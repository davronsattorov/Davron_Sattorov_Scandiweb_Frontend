import React, { Component } from "react";

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
