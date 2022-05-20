import React, { useState, Component } from "react";
import {
  MdPriceChange,
  MdArticle,
  MdAccountBox,
  MdAnnouncement,
  MdGite,
} from "react-icons/md";
import { AiFillDatabase, AiFillTag } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import IArticle from "../Interfaces/IArticle";

interface IArticleModalScreenProps {
  showModal: boolean;
  toggleModal: () => void;
  article: IArticle;
  setSelectedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
}
function updateArticle(article: IArticle) {
  // write an update article function with fetch
  fetch(`https://localhost:7013/api/article/${article.id}`, {
    method: "PUT",
    body: JSON.stringify(article),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}
export default function ArticleModalScreen(props: IArticleModalScreenProps) {
  return (
    <div>
      {props.showModal && (
        <View style={styles.modal}>
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Modal</Text>
            <View style={styles.gridContainer}>
              <View style={styles.itemContainer}>
                <MdAccountBox color="white" size={50} />
                <TextInput
                  editable={false}
                  value={props.article.id.toString()}
                  style={styles.textInput}
                  placeholder="ID"
                />
              </View>
              <View style={styles.itemContainer}>
                <BiRename color="white" size={50} />
                <TextInput
                  onChangeText={(event) =>
                    props.setSelectedArticle({ ...props.article, name: event })
                  }
                  value={props.article.name}
                  style={styles.textInput}
                  placeholder="Name"
                />
              </View>
              <View style={styles.itemContainer}>
                <MdPriceChange color="white" size={50} />
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(event) =>
                    props.setSelectedArticle({
                      ...props.article,
                      price: parseInt(event !== "" ? event : "0"),
                    })
                  }
                  value={props.article.price.toString()}
                  style={styles.textInput}
                  placeholder="Price"
                />
              </View>
              <View style={styles.itemContainer}>
                <MdArticle color="white" size={50} />
                <TextInput
                  onChangeText={(event) =>
                    props.setSelectedArticle({
                      ...props.article,
                      description: event,
                    })
                  }
                  value={props.article.description}
                  style={styles.textInput}
                  placeholder="Description"
                />
              </View>
              <View style={styles.itemContainer}>
                <MdAnnouncement color="white" size={50} />
                <TextInput
                  value={props.article.available ? "true" : "false"}
                  style={styles.textInput}
                  placeholder="Available"
                />
              </View>
              <View style={styles.itemContainer}>
                <MdGite color="white" size={50} />
                <TextInput
                  onChangeText={(event) =>
                    props.setSelectedArticle({
                      ...props.article,
                      manufacturer: event,
                    })
                  }
                  value={props.article.manufacturer}
                  style={styles.textInput}
                  placeholder="Manufacturer"
                />
              </View>
              <Button
                title="Update"
                color={"black"}
                onPress={() => updateArticle(props.article)}
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
