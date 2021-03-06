import React, { useState } from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import CartButton from "../components/CartButton";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import OrderItem from "../components/orderItem";

const OrderScreen = (props) => {
  const orderItems = useSelector((state) => state.orders.orders);
  return (
    <FlatList
      data={orderItems}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          items={itemData.item.items}
          date={itemData.item.readableDate}
          amount={itemData.item.amount}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
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

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 5,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
