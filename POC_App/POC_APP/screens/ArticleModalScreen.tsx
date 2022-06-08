import React, { useState, Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import IArticle from "../Interfaces/IArticle";
import { Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const windowwidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

interface IArticleModalScreenProps {
  showModal: boolean;
  toggleModal: () => void;
  article: IArticle;
  setSelectedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
}
function updateArticle(article: IArticle) {
  // write an update article function with fetch
  fetch(`http://10.0.2.2:5013/api/article/${article.id}`, {
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
    <View>
      {props.showModal && (
        <View style={styles.modal}>
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.text}>Modal</Text>
            </View>
            <View style={styles.gridContainer}>
              <View style={styles.itemContainer}>
                <Icon name="key" size={25} color="#fff" />
                <TextInput
                  editable={false}
                  value={props.article.id.toString()}
                  style={styles.textInput}
                  placeholder="ID"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="cart-arrow-down" size={25} color="#fff" />
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
                <Icon name="dollar" size={25} color="#fff" />
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
                <Icon name="comment" size={25} color="#fff" />
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
                <Icon name="check-circle" size={25} color="#fff" />
                <TextInput
                  value={props.article.available ? "true" : "false"}
                  style={styles.textInput}
                  placeholder="Available"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="user-secret" size={25} color="#fff" />
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
            </View>
            <View style={styles.footer}>
              <View style={styles.buttonstyle}>
                <Button
                  title="Update"
                  color={"black"}
                  onPress={() => updateArticle(props.article)}
                />
              </View>
              <View style={styles.buttonstyle}>
                <Button
                  title="Cancel"
                  color={"black"}
                  onPress={props.toggleModal}
                  accessibilityLabel="close"
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    // the grey modal container background
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: windowheight,
    width: windowwidth,
    top: 0,
    left: -200,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  itemContainer: {
    // contains the text input and the icons
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    // main container for the modal screen with the grid
    zIndex: 999,
    backgroundColor: "black",
    position: "absolute",
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "45%",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 4,
    padding: 5,
  },
  textInput: {
    height: 30,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonstyle: {
    borderRadius: 3,
    borderColor: "white",
    borderWidth: 2,
  },
  header: {
    // header for the modal screen
    backgroundColor: "gray",
    height: "10%",
    width: "100%",
    display: "flex",
  },
  footer: {
    // footer for the modal screen
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "gray",
    borderTopWidth: 1,
    borderTopColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
