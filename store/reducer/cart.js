import CartItem from "../../models/cart";
import { ADD_TO_CART, REMOVE_TO_CART } from "../action/cart";
import { ADD_ORDERS } from "../action/orders";

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

      // console.log(state, "state");

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
    case REMOVE_TO_CART:
      const quantity = state.cartItems[action.pId].count;
      let updatedCarts;
      if (quantity > 1) {
        updatedCart = new CartItem(
          state.cartItems[action.pId].count - 1,
          state.cartItems[action.pId].productName,
          state.cartItems[action.pId].price,
          state.cartItems[action.pId].sum - state.cartItems[action.pId].price
        );
        updatedCarts = { ...state.cartItems, [action.pId]: updatedCart };
      } else {
        updatedCarts = { ...state.cartItems };

        delete updatedCarts[action.pId];
      }
      return {
        ...state,
        cartItems: updatedCarts,
        totalAmount: state.totalAmount - state.cartItems[action.pId].price,
      };
    case ADD_ORDERS:
      return initialState;
  }
  return state;
};
// console.log(state, "state");
