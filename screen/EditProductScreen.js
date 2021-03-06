import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderTitle } from "react-navigation-stack";

const EditProductScreen = (props) => {
  return (
    <View>
      <Text>Edit</Text>
    </View>
  );
};
EditProductScreen.navigationOptions = (navData) => {
  return { headerTitle: "Edit Products" };
};

export default EditProductScreen;

const styles = StyleSheet.create({});
