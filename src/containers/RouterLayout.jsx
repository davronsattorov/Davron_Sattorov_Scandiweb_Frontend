import React, { Component } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default class RouterLayout extends Component {
  render() {
    return (
      <div>
        <Layout navbar={<Navbar />}>{this.props.children} </Layout>
      </div>
    );
  }
}
