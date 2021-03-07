export const DELETE = "DELETE";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const addProduct = (productName, imgUrl, price, description) => {
  return {
    type: ADD_PRODUCT,
    product: {
      productName,
      imgUrl,
      price,
      description,
    },
  };
};

export const updateProduct = (id, productName, imgUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    product: {
      id,
      productName,
      imgUrl,
      description,
    },
  };
};

export const toDelete = (id) => {
  return {
    type: DELETE,
    productId: id,
  };
};
