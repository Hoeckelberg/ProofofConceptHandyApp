import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ArticleScreen({ navigation }: RootTabScreenProps<'Article'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ArticleScreen.tsx" />
    </View>
  );
}

interface Article {
  id: number;
  name: string;
  price: number;
  description: string;
  available: boolean;
  manufacturer: string;
}

const defaultArticle: Article[] = [];

const [articles, setArticles] = useState(defaultArticle);

React.useEffect(() => {
  // fetch data from backend API and set to state
  axios.get<Article[]>('http://localhost:8080/api/articles').then(response => {
    setArticles(response.data);
  });
}, []);

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
