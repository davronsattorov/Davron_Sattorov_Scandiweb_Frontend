import React, { Component } from "react";
import Card from "../../components/Card";
import stl from "./index.module.css";

const listItems = [
  {
    id: 1,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: true,
  },
  {
    id: 2,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: true,
  },
  {
    id: 3,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: false,
  },
  {
    id: 4,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: true,
  },
  {
    id: 5,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: true,
  },
  {
    id: 6,
    title: "Apollo Running Short",
    price: "50.00",
    isAvaliable: true,
  },
];

export class Category extends Component {
  render() {
    return (
      <div className={stl.container}>
        <h1>Category name</h1>
        <div className={stl.list}>
          {listItems.map((item, id) => (
            <Card item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
