import { Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import ICustomer from "../Interfaces/ICustomer";
import customerProvider from "../provider/CustomerProvider";
import Modal from "./CustomerModalScreen";

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
      <Text>{"\n"}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#252625",
        }}
      >
        {customer
          ? customer.map((c, key) => {
              return (
                <View key={key} style={{ display: "flex" }}>
                  <Text>
                    ID: {c.id}, Name: {c.name},
                    Address: {c.address}, PhoneNumber: {c.phoneNumber}, Owner:{" "}
                    {c.owner}
                  </Text>
                  <Pressable
                    onPress={() => toggleModalWithProps(c)}
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
