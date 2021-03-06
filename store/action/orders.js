export const ADD_ORDERS = "ADD_ORDERS";

export const addOrders = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDERS,
    items: cartItems,
    amount: totalAmount,
  };
};
