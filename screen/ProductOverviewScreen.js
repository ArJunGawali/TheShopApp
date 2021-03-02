import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../store/action/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../components/CartButton";
import { Ionicons } from "@expo/vector-icons";

const ProductOverviewScreen = (props) => {
  const availableProduct = useSelector((state) => state.product.userProduct);
  console.log(availableProduct);

  const detailHandler = () => {
    props.navigation.navigate("productDetail", {
      productId: availableProduct.id,
      productTitle: availableProduct.productName,
    });
  };

  const dispatch = useDispatch();
  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductCard
          title={itemData.item.productName}
          //   imgUrl={itemData.item.imgUrl}
          price={itemData.item.price}
          detailsHandler={() => {
            props.navigation.navigate("productDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.productName,
            });
          }}
          addCartHandler={() => {
            console.log(dispatch, "fuction");
            dispatch(cartAction.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
