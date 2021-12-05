import React, { Component } from "react";
import Card from "../../components/Card";
import stl from "./index.module.css";
import { client } from "../../App";
import { GET_PRODUCTS_BY_CATEGORY } from "../../graphql/queries";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      isGettingData: true,
    };

    this.getItems = (type) => {
      this.setState({ isGettingData: true });
      client
        .query({
          query: GET_PRODUCTS_BY_CATEGORY(type),
        })
        .then((result) => {
          this.setState({ category: result.data.category });
          this.setState({ isGettingData: false });
        });
    };
  }

  componentDidMount() {
    let { type } = this.props.match.params;

    this.getItems(type);
  }

  render() {
    return !this.state.isGettingData ? (
      <div className={stl.container}>
        <h1>{capitalizeFirstLetter(this.state.category?.name)}</h1>
        <div className={stl.list}>
          {this.state.category?.products?.map((item, id) => (
            <Card item={item} match={this.props.match} key={id} />
          ))}
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default Category;
