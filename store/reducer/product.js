import PRODUCTS from "../../data/dummy-data";

const initialState = {
  product: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.usrId === "u1"),
};

export default (state = initialState, action) => {
  return state;
};
console.log(PRODUCTS, "jjf");
