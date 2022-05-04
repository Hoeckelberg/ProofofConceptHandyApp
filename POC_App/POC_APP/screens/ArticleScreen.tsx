import React, {useState, useEffect} from 'react';
import { Button, StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IArticle from '../Interfaces/IArticle';
import articleProvider from '../provider/ArticleProvider';
import { RootTabScreenProps } from '../types';
import axios from 'axios';

export default function ArticleScreen({ navigation }: RootTabScreenProps<'Article'>) {
  const [article, setArticle] = useState<IArticle[]>([]);
  useEffect(() => {
    articleProvider().then(res => {
      setArticle(res);
      console.log(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article Screen</Text>
      {article?article.map((a, key) => {
        return <Text key={key}>ID: {a.id}, Name: {a.name}, Price: {a.price}, Description: {a.description}, Available: {a.available}, Manufacturer: {a.manufacturer}</Text>;
      }): null}
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
