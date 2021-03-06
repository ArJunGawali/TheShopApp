import React from "react";
import { StyleSheet, Text, View, FlatList, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../components/CartButton";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../store/action/product";

const UserProductScreen = (props) => {
  const availableProduct = useSelector((state) => state.product.userProduct);
  // console.log(availableProduct);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    console.log("i am running");
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.toDelete(id));
        },
      },
    ]);
  };

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
            props.navigation.navigate("editProduct", {
              productId: itemData.item.id,
              productTitle: itemData.item.productName,
            });
          }}
        >
          <Button
            title="Edit Product"
            onPress={() => {
              props.navigation.navigate("editProduct", {
                productId: itemData.item.id,
                productTitle: itemData.item.productName,
              });
            }}
          />
          <Button
            title="Delete Product"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductCard>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Products",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Add"
          iconName="create"
          onPress={() => {
            navData.navigation.navigate("editProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;

const styles = StyleSheet.create({});
