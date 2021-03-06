import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { HeaderTitle } from "react-navigation-stack";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const ProductId = props.navigation.getParam("productId");
  console.log(ProductId);
  const selectedProduct = useSelector((state) =>
    state.product.product.find((prod) => prod.id === ProductId)
  );
  return (
    <View>
      <Image style={styles.img} source={{ uri: selectedProduct.imgUrl }} />
      <View style={styles.buttonCon}>
        <Button title="Add To Cart" onPress={() => {}} />
      </View>

      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  img: {
    height: 400,
    // width: "100%",
    margin: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
    margin: 10,
    // fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    margin: 10,
    // fontFamily: "open-sans",
  },
  buttonCon: {
    margin: 10,
    alignItems: "center",
  },
});
