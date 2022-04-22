import { StyleSheet } from 'react-native';
import React, { useState, } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ShoppingCartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart Screen</Text>
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
});
