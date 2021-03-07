import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { State } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../components/CartButton";
import * as productActions from "../store/action/product";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  console.log(productId);
  // const editProduct = useSelector((state) =>
  //   state.product.userProduct.find((prod) => prod.id === productId)
  // );
  const editProduct = props.navigation.getParam("product");
  console.log(editProduct);
  const dispatch = useDispatch();
  const [name, setName] = useState(editProduct ? editProduct.productName : "");
  const [imgUrl, setImgUrl] = useState(editProduct ? editProduct.imgUrl : "");
  const [price, setPrice] = useState(editProduct ? editProduct.price : "");
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editProduct) {
      console.log("aaa");
      dispatch(
        productActions.updateProduct(productId, name, imgUrl, description)
      );
    } else {
      console.log("bbb");
      dispatch(productActions.addProduct(name, imgUrl, +price, description));
    }
    props.navigation.goBack();
  }, [dispatch, name, imgUrl, price, description]);
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <View style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.text}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.text}>Image Url</Text>
        <TextInput
          style={styles.input}
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
        />
      </View>
      {!editProduct && (
        <View style={styles.formControl}>
          <Text style={styles.text}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      )}
      <View style={styles.formControl}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          autoFocus
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </View>
  );
};
EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="save"
          iconName="checkmark-sharp"
          iconSize={23}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  formControl: {
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
