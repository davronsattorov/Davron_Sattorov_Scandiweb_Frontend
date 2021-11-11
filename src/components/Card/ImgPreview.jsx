import React, { Component } from "react";
import stl from "./index.module.css";

export default class ImgPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgId: 0,
    };

    this.nextImg = (e) => {
      e.stopPropagation();
      this.setState({
        imgId:
          this.props.gallery.length - 1 !== this.state.imgId
            ? this.state.imgId + 1
            : 0,
      });
    };

    this.prevImg = (e) => {
      e.stopPropagation();
      this.setState({
        imgId:
          this.state.imgId !== 0
            ? this.state.imgId - 1
            : this.props.gallery.length - 1,
      });
    };
  }

  render() {
    const { width = "141", height = "185" } = this.props;

    return (
      <div className={stl.product_image}>
        <span
          className={`${stl.arrows} ${stl.left_arrow}`}
          onClick={(e) => this.prevImg(e)}
        >
          &lt;
        </span>
        <img
          src={this.props.gallery[this.state.imgId]}
          alt=""
          width={width}
          height={height}
        />
        <span
          className={`${stl.arrows} ${stl.right_arrow}`}
          onClick={(e) => this.nextImg(e)}
        >
          &gt;
        </span>
      </div>
    );
  }
}
