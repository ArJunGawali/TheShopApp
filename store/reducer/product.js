import PRODUCTS from "../../data/dummy-data";
import { DELETE } from "../action/product";

const initialState = {
  product: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.usrId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        product: state.product.filter(
          (product) => product.id !== action.productId
        ),
        userProduct: state.userProduct.filter(
          (product) => product.id != action.productId
        ),
      };
  }
  return state;
};
// console.log(PRODUCTS, "jjf");
