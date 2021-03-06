import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screen/ProductOverviewScreen";
import ProductDetailScreen from "../screen/ProductDetailScreen";
import ProductCartScreen from "../screen/ProductCartScreen";
import UserProductScreen from "../screen/UserProductScreen";
import EditProductScreen from "../screen/EditProductScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import OrderScreen from "../screen/OrderScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const defaultNavOptions = {
  headerTintColor: "white",
  headerTitleStyle: {
    // fontFamily: "open-sans-bold",
    fontWeight: "bold",
  },
  headerStyle: {
    backgroundColor: "#87366b",
  },
};
const ShopNavigator = createStackNavigator(
  {
    productOverview: ProductOverviewScreen,
    productDetail: ProductDetailScreen,
    cart: ProductCartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrderNav = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AdminNav = createStackNavigator(
  {
    userProduct: UserProductScreen,
    editProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Product: ShopNavigator,
    Orders: OrderNav,
    Admin: AdminNav,
  },
  {
    contentOptions: {
      activeTintColor: "#87366b",
    },
  }
);

export default createAppContainer(MainNavigator);
