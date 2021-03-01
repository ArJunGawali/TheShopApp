import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
// import { store } from "./store/store";
import ShopNavigator from "./navigation/ShopNavigator";
import { createStore, combineReducers } from "redux";

import productReducer from "./store/reducer/product";

const rootReducer = combineReducers({
  product: productReducer,
});
export const store = createStore(rootReducer);

export default function App() {
  console.log(rootReducer, "sjahfk");
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
