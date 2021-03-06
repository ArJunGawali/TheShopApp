import Orders from "../../models/orders";
import { ADD_ORDERS } from "../action/orders";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  // console.log(state, "orders");
  switch (action.type) {
    case ADD_ORDERS:
      const newOrder = new Orders(
        new Date().toString,
        action.items,
        action.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
