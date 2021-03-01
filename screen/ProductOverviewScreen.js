import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";

import { useSelector } from "react-redux";

const ProductOverviewScreen = () => {
  const availableProduct = useSelector((state) => state.product.product);
  console.log(availableProduct);
  return (
    <FlatList
      data={availableProduct}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductCard
          title={itemData.item.productName}
          imgUrl={itemData.item.imgUrl}
          price={itemData.item.price}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
