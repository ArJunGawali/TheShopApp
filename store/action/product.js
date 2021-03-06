export const DELETE = "DELETE";

export const toDelete = (id) => {
  return {
    type: DELETE,
    productId: id,
  };
};
