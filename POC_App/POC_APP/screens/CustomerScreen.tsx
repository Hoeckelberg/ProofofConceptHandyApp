import { StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ICustomer from '../Interfaces/ICustomer';
import customerProvider from '../provider/CustomerProvider';
import {BsPerson} from 'react-icons/bs';

export default function CustomerScreen() {
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  useEffect(() => {
    customerProvider().then(res => {
      setCustomer(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Screen</Text>
      <br />
      <div style={{backgroundColor: 'blue'}}>
      {customer.map((a, key) => {
        return <div><Text key={key}> <div style={{}}><BsPerson size={70}/></div>ID: {a.id}, Name: {a.name}, Address: {a.address}, Phone Number: {a.phoneNumber}, Owner: {a.owner}</Text></div>;
      })}
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  div1: {
    backgroundColor: '#fff',
  }
});
