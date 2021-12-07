import React, { Component } from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import stl from "./index.module.css";
import ProductSizes from "../../components/ProductSizes";
import Button from "../../components/ Button";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { client } from "../../App";
import {
  addItem,
  clearCart,
  reduceItemQuantity,
  removeItem,
} from "../../redux/actions/cartActions";
import showPrice from "../../functions/showPrice";
import isObjectEmpty from "../../functions/isObjectEmpty";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGettingData: true,
      previewImg: "",
      product: {},
      selectedAttributes: {},
    };

    this.refreshPage = () => window.location.reload(false);

    this.getProduct = (productId) => {
      this.setState({ isGettingData: true });

      client
        .query({
          query: GET_PRODUCT_BY_ID(productId),
        })
        .then((result) => {
          this.setState({
            product: result.data.product,
            previewImg: result.data.product.gallery[0],
          });
          this.setState({ isGettingData: false });
        });
    };
  }

  componentDidMount() {
    const { productId } = this.props.match.params;

    this.getProduct(productId);
  }

  render() {
    const { selectedCurrency, addItem } = this.props;
    const { isGettingData, product, previewImg, selectedAttributes } =
      this.state;

    const setMainImg = (img) => this.setState({ previewImg: img });

    const handleSubmit = () => {
      //if attributes are not selected,
      //then first item of each attribute is selected automatically
      if (isObjectEmpty(selectedAttributes)) {
        addItem({
          ...product,
          selectedAttributes: {
            ...product.attributes.reduce(
              (acc, cur) => ({
                ...acc,
                [cur.name]: cur.items[0].value,
              }),
              {}
            ),
          },
        });
      } else addItem({ ...product, selectedAttributes });
    };

    return (
      !isGettingData && (
        <div className={stl.container}>
          <div className={stl.image_list}>
            {product.gallery.map((url, index) => (
              <img
                key={index}
                src={url}
                alt=""
                width="80"
                height="80"
                onClick={() => setMainImg(url)}
              />
            ))}
          </div>

          <div className={stl.images}>
            <div className={stl.main_image}>
              <img src={previewImg} alt="preview" width="610" height="511" />
            </div>
            <div className={stl.product_info}>
              <div className={stl.title}>{product.name}</div>
              {product.attributes.map(({ name, items }, index) => (
                <ProductSizes
                  key={index}
                  name={name}
                  items={items}
                  onChange={(val) =>
                    this.setState({
                      selectedAttributes: {
                        ...selectedAttributes,
                        [name]: val,
                      },
                    })
                  }
                />
              ))}

              <div className={stl.price}>
                <p>Price:</p>
                <p>{showPrice(product.prices, selectedCurrency)}</p>
              </div>
              <Button onClick={() => handleSubmit()}>ADD TO CART</Button>
              <div
                className={stl.description}
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const { cartItems } = state.cart;
  const { selectedCurrency } = state.currency;
  return {
    cartItems,
    selectedCurrency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    reduceItemQuantity: (item) => dispatch(reduceItemQuantity(item)),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

Product.propTypes = {
  match: PropsType.object,
  selectedCurrency: PropsType.string,
  addItem: PropsType.func,
};
