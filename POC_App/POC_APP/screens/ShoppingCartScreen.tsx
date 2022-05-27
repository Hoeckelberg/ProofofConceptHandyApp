import {
  FlatList,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "./ShoppingCartModalScreen";
import IShoppingCart from "../Interfaces/IShoppingCart";
import shoppingCartProvider from "../provider/ShoppingCartProvider";
import * as SQLite from "expo-sqlite";

// open a sqlite database and create a table
const db = SQLite.openDatabase("shoppingCart.db");

db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists shoppingCart (id integer primary key not null, name text, price float, quantity int, image text)"
  );
});

db.transaction((tx) => {
  tx.executeSql(
    'insert into shoppingCart (name, price, quantity, image) values ("Bread", "1.00", "1", "https://images-na.ssl-images-amazon.com/images/I/71-1QQQQQQQL._SL1500_.jpg")'
  );
});

db.transaction((tx) => {
  tx.executeSql(
    "SELECT * FROM shoppingCart WHERE name = ? AND price = ?",
    ["Bread", "1.00"],
    (tx, results) => {
      console.log(results);
    }
  );
});

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
      <Text>{"\n"}</Text>
      <View
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
                <View key={key} style={{ display: "flex" }}>
                  <Text style={{ color: "white" }}>
                    id: {s.id}, articleId: {s.articleId},
                    customerId: {s.customerId}, quantity: {s.quantity}
                  </Text>
                </View>
              );
            })
          : null}
        <Text>{"\n"}</Text>
        <Pressable style={{backgroundColor: "white",}} onPress={() => toggleModalWithProps(postShoppingCart)}>
          <Text>View</Text>
        </Pressable>
      </View>
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
