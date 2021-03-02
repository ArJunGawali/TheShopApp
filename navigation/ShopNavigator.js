import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screen/ProductOverviewScreen";
import ProductDetailScreen from "../screen/ProductDetailScreen";
import ProductCartScreen from "../screen/ProductCartScreen";

const ShopNavigator = createStackNavigator(
  {
    productOverview: {
      screen: ProductOverviewScreen,
      navigationOptions: {
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
          fontWeight: "bold",
        },
      },
    },
    productDetail: {
      screen: ProductDetailScreen,
      navigationOptions: {
        headerTintColor: "white",
      },
    },
    Cart: {
      screen: ProductCartScreen,
      navigationOptions: {
        headerTintColor: "white",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#87366b",
      },
      headerTitleStyle: {
        fontFamily: "rock-roll",
      },
    },
  }
);

export default createAppContainer(ShopNavigator);
