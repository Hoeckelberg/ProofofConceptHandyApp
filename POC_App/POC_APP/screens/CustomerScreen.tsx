import { Dimensions, ImageBackground, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import ICustomer from "../Interfaces/ICustomer";
import customerProvider from "../provider/CustomerProvider";
import Modal from "./CustomerModalScreen";
import { DataTable } from "react-native-paper";

const image = { uri: "https://reactjs.org/logo-og.png" };
const windowwidth = Dimensions.get('window').width;

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
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
      <Pressable>
        <Text>Refresh</Text>
      </Pressable>
      <Text>{"\n"}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#252625",
        }}
      >
        <View style={{backgroundColor: 'white',}}>
          <DataTable.Header>
            <DataTable.Title style={{flex: 0.4}}>ID</DataTable.Title>
            <DataTable.Title style={{flex: 0.7}}>Name</DataTable.Title>
            <DataTable.Title style={{flex: 0.5}}>Address</DataTable.Title>
            <DataTable.Title style={{flex: 0.8}}>PhoneNumber</DataTable.Title>
            <DataTable.Title style={{flex: -1}}>Owner</DataTable.Title>
          </DataTable.Header>
        </View>

        {customer
          ? customer.map((c, key) => {
              return (
                <View key={key} style={{ display: "flex", backgroundColor: 'white', minWidth: windowwidth}}>
                  <DataTable>
                      <DataTable.Row>
                        <DataTable.Cell style={{flex: 0.4}}>{c.id}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 0.7}}>{c.name}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 0.7}}>{c.address}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 0.7}}>{c.phoneNumber}</DataTable.Cell>
                        <DataTable.Cell style={{flex: -1}}>{c.owner}</DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>                    
                  <Pressable
                    onPress={() => toggleModalWithProps(c)}
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                      backgroundColor: "red",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20, width: windowwidth, textAlign: 'center', }}>Edit</Text>
                  </Pressable>
                </View>
              );
            })
          : null}
      </View>
      </ImageBackground>
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
    textAlign: "center",
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
  image: {
    zIndex: 5,
    flex: 1,
  },
});
