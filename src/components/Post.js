import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class Post extends Component {

  constructor(props) {
    super(props);
      this.state = {
        fotos: this.props.fotos
      }
  }

  carregaIcone(likeada) {
    return likeada ? require('../../resources/img/s2-checked.png')
                   : require('../../resources/img/s2.png')
  }

  exibeLikes(likers) {
    if(likers.length < 1)
      return 

    return <Text style={styles.curtidas}>
            {likers.length} curtidas
           </Text>
  }

  exibeLegenda(fotos) {
    if(fotos.comentario === '')
    return

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{fotos.loginUsuario}</Text>
        <Text>{fotos.comentario}</Text>
      </View>
    )
  }

  like = () => {

    let novaLista = [];

      if(!this.state.fotos.likeada) {
        novaLista = [
          ...this.state.fotos.likers,
          {login: 'meuUsuario'}
        ]
      } else {
        novaLista = this.state.fotos.likers
          .filter(liker => liker.login != 'meuUsuario')
      }

    const fotoAtualizada = {
      ...this.state.fotos,
      likeada: !this.state.fotos.likeada,
      likers: novaLista
    }

    this.setState({ fotos:fotoAtualizada });
  }

  render() {

    const { fotos } = this.state; 

    return (

        <View>
          <View style={styles.header}> 
              <Image 
                source={{ uri: fotos.urlPerfil }} 
                style={styles.fotoDePerfil}/>
              <Text>
                {fotos.loginUsuario}
              </Text>
          </View>
          <Image 
            source={{ uri: fotos.urlFoto }} 
            style={styles.fotoFeed}/>
          <View style={styles.rodape}>
            <TouchableOpacity onPress={this.like}>
              <Image  
                source={ this.carregaIcone(fotos.likeada)} 
                style={styles.botaoDeLike}/>
            </TouchableOpacity>
            
            { this.exibeLikes(fotos.likers) }
            { this.exibeLegenda(fotos) }            

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
  botaoDeLike: {
    width: 40,
    height: 40
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }
});


