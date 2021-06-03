import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { State } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../components/CartButton";
import * as productActions from "../store/action/product";

const FORM_UPDATE = "UPDATE";
const FOCUS = "FOCUS";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputIndetifier]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputIndetifier]: action.isValid,
    };
    let updatedFormValid = true;
    for (const key in updatedValidities) {
      updatedFormValid = updatedFormValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      isFormValid: updatedFormValid,
    };
  }
  if (action.type === FOCUS) {
    console.log("in focus");
    const updateFocus = {
      ...state.inputFocus,
      [action.inputIndetifier]: true,
    };
    return {
      ...state,
      inputFocus: updateFocus,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const editProduct = props.navigation.getParam("product");
  // console.log(editProduct);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      name: editProduct ? editProduct.productName : "",
      imgUrl: editProduct ? editProduct.imgUrl : "",
      price: editProduct ? editProduct.price : "",
      description: editProduct ? editProduct.description : "",
    },
    inputValidities: {
      name: editProduct ? true : false,
      imgUrl: editProduct ? true : false,
      price: editProduct ? true : false,
      description: editProduct ? true : false,
    },
    inputFocus: {
      name: false,
      imgUrl: false,
      price: false,
      description: false,
    },
    isFormValid: editProduct ? true : false,
  });

  const dispatch = useDispatch();
  // const [name, setName] = useState(editProduct ? editProduct.productName : "");
  // const [imgUrl, setImgUrl] = useState(editProduct ? editProduct.imgUrl : "");
  // const [price, setPrice] = useState(editProduct ? editProduct.price : "");
  // const [description, setDescription] = useState(
  //   editProduct ? editProduct.description : ""
  // );

  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editProduct) {
      // console.log("aaa");
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputValues.name,
          formState.inputValues.imgUrl,
          formState.inputValues.description
        )
      );
    } else {
      // console.log("bbb");
      dispatch(
        productActions.addProduct(
          formState.inputValues.name,
          formState.inputValues.imgUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputHandler = (inputIndetifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    formDispatch({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      inputIndetifier: inputIndetifier,
    });
  };
  const lostFocus = (inputIndetifier) => {
    // console.log("lostFocus");
    // console.log(formState);
    formDispatch({
      type: FOCUS,
      inputIndetifier: inputIndetifier,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      // keyboardVerticalOffset={10}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.text}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.name}
            onChangeText={inputHandler.bind(this, "name")}
            onBlur={lostFocus.bind(this, "name")}
          />
          {!formState.inputValidities.name && formState.inputFocus.name && (
            <Text style={styles.errText}>Please enter valid name</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.text}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imgUrl}
            onChangeText={inputHandler.bind(this, "imgUrl")}
            onBlur={lostFocus.bind(this, "imgUrl")}
          />
          {!formState.inputValidities.imgUrl && formState.inputFocus.imgUrl && (
            <Text style={styles.errText}>Please enter valid Img Url</Text>
          )}
        </View>

        {!editProduct && (
          <View style={styles.formControl}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={inputHandler.bind(this, "price")}
              keyboardType="decimal-pad"
              onBlur={lostFocus.bind(this, "price")}
            />
            {!formState.inputValidities.price && formState.inputFocus.price && (
              <Text style={styles.errText}>Please enter valid Price</Text>
            )}
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.text}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={inputHandler.bind(this, "description")}
            onBlur={lostFocus.bind(this, "description")}
            multiline={true}
          />
          {!formState.inputValidities.description &&
            formState.inputFocus.description && (
              <Text style={styles.errText}>Please enter valid Description</Text>
            )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  errText: {
    color: "red",
    fontSize: 12,
  },
});
