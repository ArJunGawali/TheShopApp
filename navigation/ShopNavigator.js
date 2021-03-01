import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screen/ProductOverviewScreen";

const ShopNavigator = createStackNavigator(
  {
    productOverview: {
      screen: ProductOverviewScreen,
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
    },
  }
);

export default createAppContainer(ShopNavigator);
