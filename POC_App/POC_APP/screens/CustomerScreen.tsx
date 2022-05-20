import { Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import ICustomer from "../Interfaces/ICustomer";
import customerProvider from "../provider/CustomerProvider";
import { BsPerson } from "react-icons/bs";
import { RootTabScreenProps } from "../types";
import { BiShoppingBag, BiEdit } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsGear, BsFillCartFill, BsBasket } from "react-icons/bs";
import {VscAccount} from "react-icons/vsc"
import Modal from "./CustomerModalScreen";
import { MdAccountBox, MdOutlineSwitchAccount } from "react-icons/md";

export default function CustomerScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>({
    id: 0,
    name: "",
    address: "",
    phoneNumber: 0,
    owner: "",
  });
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  const toggleModalWithProps = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowModal(!showModal);
  };
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  useEffect(() => {
    customerProvider().then((res) => {
      setCustomer(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          showModal={showModal}
          customer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
      <Text style={styles.title}>Customer Screen</Text>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: '#252625'
        }}
      >
        {customer
          ? customer.map((c, key) => {
              return (
                <div key={key} style={{ display: "flex" }}>
                  <Text> 
                    <VscAccount size={60} /> ID: {c.id}, Name: {c.name},
                    Address: {c.address}, PhoneNumber: {c.phoneNumber}, 
                    Owner: {c.owner}
                  </Text>
                  <button
                    onClick={() => toggleModalWithProps(c)}
                    style={{ backgroundColor:'transparent', marginRight: 0, marginLeft: "auto", border: "none" }}
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
