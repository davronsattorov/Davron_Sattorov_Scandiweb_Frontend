import React, { Component } from "react";
import stl from "./index.module.css";

export default class ProductSizes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: "S",
    };

    this.handleChange = (input) => this.setState({ selectedSize: input });
  }

  render() {
    const { sizes = ["XS", "S", "M", "L"] } = this.props;

    const selectedStyle = {
      background: "#1D1F22",
      color: "#fff",
    };

    return (
      <div className={stl.container}>
        {sizes.map((size) => (
          <div
            style={size === this.state.selectedSize ? selectedStyle : {}}
            onClick={() => {
              this.handleChange(size);
              this.props.onChange(size);
            }}
          >
            {size}
          </div>
        ))}
      </div>
    );
  }
}
