import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

export default class Post extends Component {
  render() {

    return (

        <View>
            <View style={styles.header}> 
                <Image source={{ uri: this.props.fotos.urlPerfil }} style={styles.fotoDePerfil}/>
                <Text>{this.props.fotos.loginUsuario}</Text>
            </View>
            <Image source={{ uri: this.props.fotos.urlFoto }} style={styles.fotoFeed}/>
        </View>
    );
  }
}

const screen = Dimensions.get('screen')
const styles = StyleSheet.create({
  header: { 
    margin: 10,
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  fotoDePerfil: { 
    marginRight: 10, 
    width: 40, 
    height: 40, 
    borderRadius: 50
  },

  fotoFeed: {
    width: screen.width, 
    height: screen.width
  }

});


