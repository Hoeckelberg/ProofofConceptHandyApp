import React, {useState, useEffect} from 'react';
import { Button, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IArticle from '../Interfaces/IArticle';
import articleProvider from '../provider/ArticleProvider';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { BiShoppingBag } from 'react-icons/bi';
import {BiEdit} from 'react-icons/bi';
import Modal from './ArticleModalScreen';

export default function ArticleScreen({ navigation }: RootTabScreenProps<'Article'>) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const [article, setArticle] = useState<IArticle[]>([]);
  useEffect(() => {
    articleProvider().then(res => {
      setArticle(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Modal showModal={showModal}/>
      <Text style={styles.title}>Article Screen</Text>
      <br />
      <div style={{backgroundColor: 'grey'}}>
      {article?article.map((a, key) => {
        return <div> <Text key={key}><BiShoppingBag size={70}/> ID: {a.id}, 
        Name: {a.name}, Price: {a.price}, Description: {a.description}, 
        Available: {a.available}, Manufacturer: {a.manufacturer}
        </Text> <button onClick={toggleModal} style={{marginRight: 0, marginLeft: 'auto',}}><BiEdit color='white' size={70}/></button> </div>;
      }): null}
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
  },
});
