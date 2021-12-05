import React, { Component } from "react";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import stl from "./index.module.css";

const selectedStyle = {
  background: "#1d1f22",
  color: "#fff",
};

export default class ProductSizes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: "",
    };

    this.handleChange = (input) => this.setState({ selectedSize: input });
  }

  componentDidMount() {
    this.handleChange(this.props.items[0].id);
  }

  render() {
    const { size = "lg", name, items, onChange, showName = true } = this.props;

    return (
      <div>
        {showName && capitalizeFirstLetter(name) + ":"}

        <div
          className={`${stl.container} ${
            size === "lg" ? stl.size_lg : stl.size_sm
          }`}
        >
          {items.map(({ id, value }) => (
            <div
              style={
                id === this.state.selectedSize
                  ? name === "Color"
                    ? { borderRadius: "50%", background: value }
                    : selectedStyle
                  : name === "Color"
                  ? { background: value, border: "0.7px solid #ccc" }
                  : {}
              }
              onClick={() => {
                this.handleChange(id);
                onChange(id);
              }}
            >
              {name !== "Color" ? value : ""}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
