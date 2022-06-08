import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Pressable, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import IArticle from "../Interfaces/IArticle";
import articleProvider from "../provider/ArticleProvider";
import Modal from "./ArticleModalScreen";
import { RootTabScreenProps } from "../types";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleScreen({
  navigation,
}: RootTabScreenProps<"Article">) {
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticle>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    available: false,
    manufacturer: "",
  });
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  const toggleModalWithProps = (article: IArticle) => {
    setSelectedArticle(article);
    setShowModal(!showModal);
  };
  const [article, setArticle] = useState<IArticle[]>([]);
  useEffect(() => {
    articleProvider().then((res) => {
      setArticle(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          showModal={showModal}
          article={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      )}
      <ScrollView>
        <Text style={styles.title}>Article Screen</Text>
        <Text>{"\n"}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#252625",
          }}
        >
          {article
            ? article.map((a, key) => {
                return (
                  <View key={key} style={styles.View1}>
                    <View style={styles.tablecolumn}>
                      <Text>ID: </Text>
                      <Text>Name: </Text>
                      <Text>Price: </Text>
                      <Text>Description: </Text>
                      <Text>Available: </Text>
                      <Text>Manufacturer: </Text>
                    </View>
                    <View style={styles.tablecolumn}>
                      <Text>{a.id}</Text>
                      <Text>{a.name}</Text>
                      <Text>{a.price}</Text>
                      <Text>{a.description}</Text>
                      <Text>{a.available ? "true" : "false"}</Text>
                      <Text>{a.manufacturer}</Text>
                    </View>
                    <Pressable
                      onPress={() => toggleModalWithProps(a)}
                      style={styles.button}
                    >
                      <Text style={styles.buttontext}>E{"\n"}D{"\n"}I{"\n"}T</Text>
                    </Pressable>
                  </View>
                );
              })
            : null}
        </View>
        <Pressable>
          <Text>Refresh</Text>
        </Pressable>
      </ScrollView>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  View1: {
    display: "flex",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 3,
    margin: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    display: "flex",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "gray",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    height: 150,
    width: 30,
    textAlignVertical: "center",
  },
  tablerow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tablecolumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
