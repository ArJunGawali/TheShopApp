import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import * as cartAction from "../store/action/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../components/CartButton";
import * as productAction from "../store/action/product";
import Constants from "expo-constants";

const ProductOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [Error, setError] = useState();

  const availableProduct = useSelector((state) => state.product.product);
  // console.log(availableProduct);
  const dispatch = useDispatch();
  // setIsRefreshing(true);

  const loadProduct = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(productAction.setProduct());
    } catch (err) {
      setError(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProduct().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProduct]);

  const detailHandler = () => {
    props.navigation.navigate("productDetail", {
      productId: availableProduct.id,
      productTitle: availableProduct.productName,
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (Error) {
    console.log(Error);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An Error occurred</Text>
        <Button title="Try Again" onPress={loadProduct} />
      </View>
    );
  }

  if (availableProduct.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Product Available, Try Adding Some</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProduct}
      refreshing={isRefreshing}
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
