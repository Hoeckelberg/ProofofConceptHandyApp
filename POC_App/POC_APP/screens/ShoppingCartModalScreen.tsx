import React, { Component, useState } from "react";
import { View } from "../components/Themed";
import IShoppingCart from "../Interfaces/IShoppingCart";
import {
  MdPriceChange,
  MdArticle,
  MdAccountBox,
  MdAnnouncement,
  MdGite,
} from "react-icons/md";
import { AiFillDatabase, AiFillTag } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { StyleSheet, Text, TextInput, Button } from "react-native";

interface IShoppingCartModalScreenProps {
  showModal: boolean;
  toggleModal: () => void;
  shoppingCart: IShoppingCart;
  setPostShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCart>>;
}

function postShoppingCart(shoppingCart: IShoppingCart) {
  // write an post ShoppingCart function with fetch
  fetch(`https://localhost:7013/api/shoppingcart`, {
    method: "POST",
    body: JSON.stringify(shoppingCart),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

export default function ShoppingCartModalScreen(
  props: IShoppingCartModalScreenProps
) {
  return (
    <div>
      {props.showModal && (
        <View style={styles.modal}>
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Modal</Text>
            <View style={styles.gridContainer}>
              <View style={styles.itemContainer}>
                <MdAccountBox color="white" size={50} />
                <Text style={{color: 'white'}}>AID</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(event) =>
                    props.setPostShoppingCart({
                      ...props.shoppingCart,
                      articleId: parseInt(event),
                    })
                  }
                  value={props.shoppingCart.articleId.toString()}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.itemContainer}>
                <MdAccountBox color="white" size={50} />
                <Text style={{color: 'white'}}>CID</Text>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(event) =>
                    props.setPostShoppingCart({
                      ...props.shoppingCart,
                      customerId: parseInt(event),
                    })
                  }
                  value={props.shoppingCart.customerId.toString()}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.itemContainer}>
                <MdAccountBox color="white" size={50} />
                <Text style={{color: 'white'}}>QTY</Text>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(event) => {
                    props.setPostShoppingCart({
                      ...props.shoppingCart,
                      quantity: parseInt(event),
                    });
                  }}
                  value={props.shoppingCart.quantity.toString()}
                  style={styles.textInput}
                />
              </View>
              <Button
                title="post"
                color={"black"}
                onPress={() => postShoppingCart(props.shoppingCart)}
              />
              <Button
                title="close"
                color={"black"}
                onPress={props.toggleModal}
              />
            </View>
          </View>
        </View>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: "100vh",
    width: "100vw",
    left: 0,
    top: 0,
  },
  itemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: "white",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    backgroundColor: "black",
    zIndex: 9999,
    position: "absolute",
    top: "20%",
    left: "43%",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 4,
  },
  textInput: {
    height: "30px",
    padding: "0 2px",
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  aaabca: {
    zIndex: 0,
    position: "relative",
    backgroundColor: "rgba(255,0,0,0.2)",
    top: "null",
    left: "null",
    height: "100vh",
    width: "100vw",
  },
});
