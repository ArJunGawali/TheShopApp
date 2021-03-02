import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductCartScreen = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <View>
      <View style={styles.summary}>
        <Text>
          Total Amount : <Text style={styles.price}>${totalAmount}</Text>
        </Text>
        <Button title="Order" />
      </View>
    </View>
  );
};

export default ProductCartScreen;

const styles = StyleSheet.create({
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
