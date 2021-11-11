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
    return (
      <div className={stl.size}>
        {capitalizeFirstLetter(this.props.name)}:
        <div className={stl.container}>
          {this.props.items.map(({ id, value }) => (
            <div
              // className={id === this.state.selectedSize && stl.selected_item}
              style={
                id === this.state.selectedSize
                  ? this.props.name === "Color"
                    ? { borderRadius: "50%", background: value }
                    : selectedStyle
                  : this.props.name === "Color"
                  ? { background: value, border: "0.7px solid #ccc" }
                  : {}
              }
              onClick={() => {
                this.handleChange(id);
                this.props.onChange(id);
              }}
            >
              {this.props.name !== "Color" ? value : ""}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
