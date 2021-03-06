import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../store/action/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../components/CartButton";

const ProductOverviewScreen = (props) => {
  const availableProduct = useSelector((state) => state.product.product);
  // console.log(availableProduct);

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
          // imgUrl={itemData.item.imgUrl}
          price={itemData.item.price}
          onSelect={() => {
            props.navigation.navigate("productDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.productName,
            });
          }}
        >
          <Button
            title="View Details"
            onPress={() => {
              props.navigation.navigate("productDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.productName,
              });
            }}
          />
          <Button
            title="Add To Cart"
            onPress={() => {
              // console.log(dispatch, "fuction");
              dispatch(cartAction.addToCart(itemData.item));
            }}
          />
        </ProductCard>
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
          title="cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("cart");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Toggle"
          iconName="menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
