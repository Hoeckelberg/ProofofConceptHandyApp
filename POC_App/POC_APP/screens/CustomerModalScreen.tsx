import React, { useState, Component } from "react";
import { AiFillDatabase, AiFillTag } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from "react-native";
import { MdManageAccounts } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import ICustomer from "../Interfaces/ICustomer";
import Icon from "react-native-vector-icons/FontAwesome";
import { parse } from "expo-linking";

const windowwidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
const screenwidth = Dimensions.get("screen").width;
const screenheight = Dimensions.get("screen").height;

interface ICustomerModalScreenProps {
  showModal: boolean;
  toggleModal: () => void;
  customer: ICustomer;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<ICustomer>>;
}
function updateCustomer(customer: ICustomer) {
  fetch(`http://10.0.2.2:5013/api/customer/${customer.id}`, {
    method: "PUT",
    body: JSON.stringify(customer),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}
export default function CustomerModalScreen(props: ICustomerModalScreenProps) {
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
                  value={props.customer.id.toString()}
                  style={styles.textInput}
                  placeholder="ID"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="user" size={25} color="#fff" />
                <TextInput
                  onChangeText={(event) =>
                    props.setSelectedCustomer({
                      ...props.customer,
                      name: event,
                    })
                  }
                  value={props.customer.name}
                  style={styles.textInput}
                  placeholder="Name"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="book" size={25} color="#fff" />
                <TextInput
                  onChangeText={(event) =>
                    props.setSelectedCustomer({
                      ...props.customer,
                      address: event,
                    })
                  }
                  value={props.customer.address.toString()}
                  style={styles.textInput}
                  placeholder="Address"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="phone" size={25} color="#fff"/>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(event) =>
                    props.setSelectedCustomer({
                      ...props.customer,
                      phoneNumber: parseInt(event !== "" ? event : "0"),
                    })
                  }
                  value={props.customer.phoneNumber.toString()}
                  style={styles.textInput}
                  placeholder="Phone Number"
                />
              </View>
              <View style={styles.itemContainer}>
                <Icon name="users" size={25} color="#fff" />
                <TextInput
                  value={props.customer.owner.toString()}
                  style={styles.textInput}
                  placeholder="Owner"
                />
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.buttonstyle}>
                <Button
                  title="Update"
                  color={"black"}
                  onPress={() => updateCustomer(props.customer)}
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
