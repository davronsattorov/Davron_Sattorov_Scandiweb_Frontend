import React, { Component } from "react";
import stl from "./index.module.css";
import ProductSizes from "../../components/ProductSizes";
import Button from "../../components/ Button";

const images = [
  {
    url: "https://www.w3schools.com/css/paris.jpg",
  },
  {
    url: "https://www.w3schools.com/css/paris.jpg",
  },
  {
    url: "https://www.w3schools.com/css/paris.jpg",
  },
];

export default class Product extends Component {
  render() {
    return (
      <div className={stl.container}>
        <div className={stl.images}>
          <div className={stl.image_list}>
            {images.map(({ url }) => (
              <img src={url} alt="" width="80" height="80" />
            ))}
          </div>
          <div className={stl.main_image}>
            <img
              src="https://www.w3schools.com/css/paris.jpg"
              alt=""
              width="610"
              height="511"
            />
          </div>
        </div>
        <div className={stl.product_info}>
          <div className={stl.title}>Apollo Running Short</div>
          <div className={stl.size}>
            Size:
            <ProductSizes onChange={(val) => console.log("Size ===>", val)} />
          </div>

          <div className={stl.price}>
            <p>Price:</p>
            <p>$50.00</p>
          </div>
          <Button>ADD TO CART</Button>
          <div className={stl.description}>
            Find stunning women's cocktail dresses and party dresses. Stand out
            in lace and metallic cocktail dresses and party dresses from all
            your favorite brands.
          </div>
        </div>
      </div>
    );
  }
}
