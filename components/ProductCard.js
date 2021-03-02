import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

const ProductCard = (props) => {
  return (
    <TouchableOpacity onPress={props.detailsHandler}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: props.imgUrl }} />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Details" onPress={props.detailsHandler} />
          <Button title="Add To Cart" onPress={props.addCartHandler} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    height: 300,
    margin: 10,
  },
  imgContainer: {
    height: "60%",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  detailContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
});
