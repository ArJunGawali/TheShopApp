import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
// import { store } from "./store/store";
import ShopNavigator from "./navigation/ShopNavigator";
import { createStore, combineReducers } from "redux";
import { AppLoading } from "expo-app-loading";
import * as Font from "expo-font";
import cartReducer from "./store/reducer/cart";
import productReducer from "./store/reducer/product";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});
export const store = createStore(rootReducer);

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "rock-roll": require("./assets/fonts/RocknRollOne-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFont} onFinish={setFontLoaded(true)} />;
  }
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
