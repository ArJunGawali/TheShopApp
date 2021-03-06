import React from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartList from "../components/CartList";
import * as cartAction from "../store/action/cart";
import * as orderAction from "../store/action/orders";

const ProductCartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const transformedCartItems = [];
  for (key in cartItems) {
    transformedCartItems.push({
      prodId: key,
      prodName: cartItems[key].productName,
      prodPrice: cartItems[key].price,
      prodCount: cartItems[key].count,
      prodSum: cartItems[key].sum,
    });
  }

  return (
    <View>
      <View style={styles.summary}>
        <Text>
          Total Amount :{" "}
          <Text style={styles.price}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title="Order"
          disabled={totalAmount === 0}
          onPress={() => {
            dispatch(orderAction.addOrders(transformedCartItems, totalAmount));
          }}
        />
      </View>
      <FlatList
        data={transformedCartItems}
        keyExtractor={(item) => item.prodId}
        renderItem={(itemData) => (
          <CartList
            name={itemData.item.prodName}
            qauntity={itemData.item.prodCount}
            totalPrice={itemData.item.prodSum.toFixed(2)}
            onRemove={() =>
              dispatch(cartAction.removeToCart(itemData.item.prodId))
            }
            deletable
          />
        )}
      />
    </View>
  );
};

ProductCartScreen.navigationOptions = {};

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
