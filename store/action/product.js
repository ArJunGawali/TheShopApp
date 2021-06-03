import Product from "../../models/Product";
export const DELETE = "DELETE";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const setProduct = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://theshopapp-47f1f-default-rtdb.firebaseio.com/product.json"
      );

      if (!response.ok) {
        throw new Error("An Error occurred");
      }

      const resData = await response.json();

      let loadedProduct = [];
      for (key in resData) {
        loadedProduct.push(
          new Product(
            key,
            "u1",
            resData[key].productName,
            resData[key].imgUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        product: loadedProduct,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const addProduct = (productName, imgUrl, price, description) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://theshopapp-47f1f-default-rtdb.firebaseio.com/product.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          imgUrl,
          price,
          description,
        }),
      }
    );

    const resData = await response.json();

    // console.log(resData);

    dispatch({
      type: ADD_PRODUCT,
      product: {
        id: resData.key,
        productName: productName,
        imgUrl: imgUrl,
        price: price,
        description: description,
      },
    });
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
