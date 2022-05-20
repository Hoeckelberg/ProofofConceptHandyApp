import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import IArticle from "../Interfaces/IArticle";
import articleProvider from "../provider/ArticleProvider";
import Modal from "./ArticleModalScreen";
import { RootTabScreenProps } from "../types";
import { BiShoppingBag, BiEdit } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsGear, BsFillCartFill, BsBasket } from "react-icons/bs";

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
      <br />
      <div
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
                <div key={key} style={{ display: "flex" }}>
                  <Text>
                    <BsBasket size={60} /> ID: {a.id}, Name: {a.name}, Price:{" "}
                    {a.price}, Description: {a.description}, Available:{" "}
                    {a.available ? "true" : "false"}, Manufacturer:{" "}
                    {a.manufacturer}
                  </Text>
                  <button
                    onClick={() => toggleModalWithProps(a)}
                    style={{
                      backgroundColor: "transparent",
                      marginRight: 0,
                      marginLeft: "auto",
                      border: "none",
                    }}
                  >
                    <BsGear color="white" size={60} />
                  </button>
                </div>
              );
            })
          : null}
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
