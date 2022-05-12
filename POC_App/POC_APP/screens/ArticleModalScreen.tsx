import React, { useState, Component } from 'react'
import {MdPriceChange} from 'react-icons/md'
import { StyleSheet, Text, View  } from 'react-native';


interface IArticleModalScreenProps {
    showModal: boolean,
}

export default class ArticleModalScreen extends Component<IArticleModalScreenProps> {
  render() {
    return (
      <div style={{color: 'white', position: 'absolute', backgroundColor: 'black',}}>
          {this.props.showModal && (
            <div>
            <div style={{zIndex: '0', position: 'relative', backgroundColor: 'rgba(255,0,0,0.2)', top: 'null', left: 'null', height: '100vh', width: '100vw'}}/>
                <div style={{backgroundColor: 'black', zIndex: '1', position: 'absolute', top: '35%', left: '35%',}}>
                <Text style={styles.title}>Modal</Text>
                <div style={{display: 'flex', flexDirection: 'column', }}>
                  <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <MdPriceChange size={50}/>
                    <input style={{height: '30px', padding: '0 2px', }} placeholder='abc' type="text" name='articleName'></input>
                  </div>
                  <div style={{}}>
                    <MdPriceChange size={50}/>
                    <input type="text" name='articlePrice'/>
                  </div>
                  <div>
                    <MdPriceChange size={70}/>
                    <input type="text" name='articleDescription'/>
                  </div>
                  <div>
                    <MdPriceChange size={70}/>
                    <input type="text" name='articleAvailable'/>
                  </div>
                  <div>
                    <MdPriceChange size={70}/>
                    <input type="text" name="articleManufacturer"/>
                  </div>
                </div>
            </div>
          </div>
          )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});