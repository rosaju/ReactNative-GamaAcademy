import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'

export default class Post extends Component {

  exibeLegenda(foto) {
    if(foto.comentario === '')
    return

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
      </View>
    )
  }

  render() {

    const { foto, likeCallback, comentarioCallback } = this.props; 

    return (

        <View>
          <View style={styles.header}> 
              <Image 
                source={{ uri: foto.urlPerfil }} 
                style={styles.fotoDePerfil}/>
              <Text>
                {foto.loginUsuario}
              </Text>
          </View>
          <Image 
            source={{ uri: foto.urlFoto }} 
            style={styles.fotoFeed}/>
          <View style={styles.rodape}>
            <Likes foto={foto} likeCallback={likeCallback}/>
            
            { this.exibeLegenda(foto) } 

            {foto.comentarios.map( comentario =>
              <Text key={comentario.id}>
                <Text style={styles.tituloComentario}>{comentario.login}</Text>
                <Text> {comentario.texto}</Text>
              </Text>
            )}    
            <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback}/>
          </View>
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
  },
  rodape: {
    margin: 10
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }
});


