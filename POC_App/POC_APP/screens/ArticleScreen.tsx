import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import IArticle from "../Interfaces/IArticle";
import articleProvider from "../provider/ArticleProvider";
import Modal from "./ArticleModalScreen";
import { RootTabScreenProps } from "../types";


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
                <View key={key} style={{ display: "flex" }}>
                  <Text>
                    ID: {a.id}, Name: {a.name}, Price:{" "}
                    {a.price}, Description: {a.description}, Available:{" "}
                    {a.available ? "true" : "false"}, Manufacturer:{" "}
                    {a.manufacturer}
                  </Text>
                  <Pressable
                    onPress={() => toggleModalWithProps(a)} 
                    style={{
                      marginRight: 0,
                      marginLeft: "auto",
                      backgroundColor: "white",
                    }}
                  >
                    <Text style={{color: 'black'}}>Edit</Text>
                  </Pressable>
                </View>
              );
            })
          : null}
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  View1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  View2: {
    display: "flex",
  },
});
