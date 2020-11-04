import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

class Details extends Component {
  state = {};
  render() {
    return (
      <div>
        <ProductConsumer>
          {(value) => {
            const {
              id,
              company,
              img,
              info,
              price,
              title,
              inCart,
            } = value.detailProduct;
            return (
              <div className="container py-5">
                <div className="row">
                  <div className="col-sm-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{title}</h1>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={img} className="img-fluid" alt="product"></img>
                  </div>
                  <div className="col-sm-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h1> model:{title}</h1>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                      <span className="text-uppercase"> madeBy: {company}</span>
                    </h4>
                    <h4 className="text-blue">
                      <strong>
                        price:<span>$</span>
                        {price}
                      </strong>
                    </h4>

                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                      some info about product
                    </p>
                    <p className="text-muted lead">{info}</p>

                    <div>
                      <Link to="/">
                        <ButtonContainer>back to products</ButtonContainer>
                      </Link>
                      <ButtonContainer
                        cart
                        disable={inCart ? true : false}
                        className="ml-2"
                        onClick={() => {
                          value.addToCart(id);
                          value.openModal(id);
                        }}
                      >
                        {inCart ? "inCart" : "add to cart"}
                      </ButtonContainer>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </div>
    );
  }
}

export default Details;
