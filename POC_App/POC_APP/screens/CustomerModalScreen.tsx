import React, { useState, Component } from 'react'
import { MdPriceChange, MdArticle, MdAccountBox, MdAnnouncement, MdGite} from 'react-icons/md'
import {AiFillDatabase, AiFillTag} from 'react-icons/ai'
import {BiRename} from 'react-icons/bi'
import { StyleSheet, Text, TextInput, View, Button, } from 'react-native';
import {MdManageAccounts} from 'react-icons/md'
import {FaRegAddressCard} from 'react-icons/fa'
import ICustomer from '../Interfaces/ICustomer';


interface ICustomerModalScreenProps {
  showModal: boolean,
  toggleModal: () => void,
  customer: ICustomer,
  setSelectedCustomer: React.Dispatch<React.SetStateAction<ICustomer>>,
}
function updateCustomer(customer: ICustomer) {
  fetch(`https://localhost:7013/api/customer/${customer.id}`, {
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
      <div>
        {props.showModal && (
          <View style={styles.modal}>
            <View style={styles.mainContainer}>
              <Text style={styles.text}>Modal</Text>
              <View style={styles.gridContainer}>
                <View style={styles.itemContainer}>
                  <MdAccountBox color='white' size={50} />
                  <TextInput editable={false} value={props.customer.id.toString()} style={styles.textInput} placeholder='ID' />
                </View>
                <View style={styles.itemContainer}>
                  <BiRename color='white' size={50} />
                  <TextInput onChangeText={event => props.setSelectedCustomer({...props.customer, name: event})} value={props.customer.name} style={styles.textInput} placeholder='Name' />
                </View>
                <View style={styles.itemContainer}>
                  <FaRegAddressCard color='white' size={50} />
                  <TextInput onChangeText={event => props.setSelectedCustomer({...props.customer, address: event})} value={props.customer.address} style={styles.textInput} placeholder='Address'/>
                </View>
                <View style={styles.itemContainer}>
                  <MdArticle color='white' size={50} />
                  <TextInput keyboardType='numeric' onChangeText={event => props.setSelectedCustomer({...props.customer, phoneNumber: parseInt(event)})} value={props.customer.phoneNumber.toString()} style={styles.textInput} placeholder='phoneNumber' />
                </View>
                <View style={styles.itemContainer}>
                  <MdManageAccounts color='white' size={50} />
                  <TextInput onChangeText={event => props.setSelectedCustomer({...props.customer, owner: event})} value={props.customer.owner} style={styles.textInput} placeholder='Owner' />
                </View>
                <Button title='Update' color={'black'} onPress={() => updateCustomer(props.customer)}/>
                <Button title='close' color={'black'} onPress={props.toggleModal}/>
              </View>
            </View>
          </View>
        )}
      </div>
    )
  }

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '100vh',
    width: '100vw',
    left: 0,
    top: 0,
  },
  itemContainer: {
    width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
  },
  gridContainer: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: 'black', zIndex: 9999, position: 'absolute', top: '20%', left: '43%', borderRadius: 10, borderColor: 'white', borderWidth: 4,
  },
  textInput: {
    height: '30px',
    padding: '0 2px',
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  aaabca: {
    zIndex: 0, position: 'relative', backgroundColor: 'rgba(255,0,0,0.2)', top: 'null', left: 'null', height: '100vh', width: '100vw'
  }
});




