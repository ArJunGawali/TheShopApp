import CartItem from "../../models/cart";
import { ADD_TO_CART } from "../action/cart";

const initialState = {
  cartItems: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const selectedProduct = action.product;
      const prodPrice = selectedProduct.price;
      const prodTitle = selectedProduct.productName;

      console.log(state, "state");

      if (state.cartItems[selectedProduct.id]) {
        const updatedCart = new CartItem(
          state.cartItems[selectedProduct.id].count + 1,
          prodTitle,
          prodPrice,
          state.cartItems[selectedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          cartItems: { ...state.cartItems, [selectedProduct.id]: updatedCart },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newItem = new CartItem(1, prodTitle, prodPrice, prodPrice);
        return {
          ...state,
          cartItems: { ...state.cartItems, [selectedProduct.id]: newItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
  }
  return state;
};
// console.log(state, "state");
