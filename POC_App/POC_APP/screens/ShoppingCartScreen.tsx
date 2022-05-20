import {
  FlatList,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { BsGear, BsFillCartFill, BsBasket } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import Modal from "./ShoppingCartModalScreen";
import IShoppingCart from "../Interfaces/IShoppingCart";
import shoppingCartProvider from "../provider/ShoppingCartProvider";
import { BiCart } from "react-icons/bi";

export default function ShoppingCartScreen() {
  const [showModal, setShowModal] = useState(false);
  const [postShoppingCart, setPostShoppingCart] = useState<IShoppingCart>({
    id: 0,
    articleId: 0,
    customerId: 0,
    quantity: 0,
  });
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  const toggleModalWithProps = (shoppingCart: IShoppingCart) => {
    setPostShoppingCart(shoppingCart);
    setShowModal(!showModal);
  };
  const [shoppingCart, setShoppingCart] = useState<IShoppingCart[]>([]);
  useEffect(() => {
    shoppingCartProvider().then((res) => {
      setShoppingCart(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      {showModal && (
        <Modal
          shoppingCart={postShoppingCart}
          toggleModal={toggleModal}
          showModal={showModal}
          setPostShoppingCart={setPostShoppingCart}
        />
      )}
      <Text style={styles.title}>Shopping Cart Screen</Text>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#252625",
        }}
      >
        {shoppingCart
          ? shoppingCart.map((s, key) => {
              return (
                <div key={key} style={{ display: "flex" }}>
                  <Text style={{ color: "white" }}>
                    <BiCart size={60} /> id: {s.id}, articleId: {s.articleId},
                    customerId: {s.customerId}, quantity: {s.quantity}
                  </Text>
                </div>
              );
            })
          : null}
        <br />
        <button onClick={() => toggleModalWithProps(postShoppingCart)}>
          Add new Shopping Cart
        </button>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  div1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  div2: {
    display: "flex",
  },
});
