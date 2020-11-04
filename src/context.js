import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState({ products: tempProducts });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  };

  addToCart = (id) => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getItem(id));
    tempProduct[index].inCart = true;
    tempProduct[index].count = 1;
    tempProduct[index].total = tempProduct[index].price;

    this.setState(
      {
        products: tempProduct,
        cart: [...this.state.cart, tempProduct[index]],
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (id) => {
    console.log("increment method");
    let cart = [...this.state.cart];
    const index = cart.indexOf(this.getItem(id));
    cart[index].count++;
    cart[index].total = cart[index].price * cart[index].count;
    this.setState({ cart: cart }, () => {
      this.addTotals();
    });
  };

  decrement = (id) => {
    console.log("decrement method");
    let cart = [...this.state.cart];
    const index = cart.indexOf(this.getItem(id));
    cart[index].count--;

    if (cart[index].count === 0) {
      this.removeItem(id);
    } else {
      cart[index].total = cart[index].price * cart[index].count;
      this.setState({ cart: cart }, () => {
        this.addTotals();
      });
    }
  };

  removeItem = (id) => {
    console.log("item removed");
    let tempProduct = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProduct.indexOf(this.getItem(id));
    tempProduct[index].inCart = false;
    tempProduct[index].count = 0;
    tempProduct[index].total = 0;

    this.setState({ cart: [...tempCart], Products: [...tempProduct] }, () => {
      this.addTotals();
    });
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({ cartSubTotal: subTotal, cartTax: tax, cartTotal: total });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
