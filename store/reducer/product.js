import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import {
  ADD_PRODUCT,
  DELETE,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../action/product";

const initialState = {
  product: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.usrId === "u1"),
};

export default (state = initialState, action) => {
  // console.log(state, "hehe");
  switch (action.type) {
    case SET_PRODUCT:
      return {
        product: action.product,
        userProduct: action.product.filter((prod) => prod.usrId === "u1"),
      };

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
    case ADD_PRODUCT:
      const addProduct = new Product(
        action.product.id,
        "u1",
        action.product.productName,
        action.product.imgUrl,
        action.product.description,
        action.product.price
      );

      return {
        ...state,
        product: state.product.concat(addProduct),
        userProduct: state.userProduct.concat(addProduct),
      };
    case UPDATE_PRODUCT:
      const updatedProductIndex = state.product.findIndex(
        (prod) => prod.id === action.product.id
      );
      const updatedUserProductIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.product.id
      );
      const updateProduct = new Product(
        action.product.id,
        state.userProduct[updatedUserProductIndex].usrId,
        action.product.productName,
        action.product.imgUrl,
        action.product.description,
        state.userProduct[updatedUserProductIndex].price
      );
      const updatedProductState = [...state.product];
      updatedProductState[updatedProductIndex] = updateProduct;
      const updatedUserProductState = [...state.userProduct];
      updatedUserProductState[updatedUserProductIndex] = updateProduct;
      return {
        ...state,
        product: updatedProductState,
        userProduct: updatedUserProductState,
      };
  }
  return state;
};
// console.log(PRODUCTS, "jjf");
