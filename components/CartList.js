import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartList = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.qauntity}>{props.qauntity}</Text>
        <Text style={styles.name}>{props.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>{props.totalPrice}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove}>
            <Ionicons name="trash" color="red" size={23} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  rightContainer: {
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "row",
  },
  price: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  qauntity: {
    marginHorizontal: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});
