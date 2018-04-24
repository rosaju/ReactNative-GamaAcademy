/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './src/components/Post';

export default class InstaluraMobile extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('http://192.168.0.137:8080/api/public/fotos/rafael')
    .then(response => response.json())
    .then(json => this.setState({fotos: json}))
  }

  like = (idFoto) => {
    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    let novaLista = [];

      if(!foto.likeada) {
        novaLista = [
          ...foto.likers,
          {login: 'meuUsuario'}
        ]
      } else {
        novaLista = foto.likers
          .filter(liker => liker.login !== 'meuUsuario')
      }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos });
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {

    if(valorComentario === '')
    return;

    const foto = this.state.fotos
      .find(foto => foto.id === idFoto);

    const novaLista = [...foto.comentarios, {
      id: Math.random(),
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos });
    inputComentario.clear();
  }

  render() {    

    return (
      <FlatList styles={ styles.container }
        data={ this.state.fotos }
        keyExtractor={ item => item.id }
        renderItem={ ({item}) => 

          <Post foto={ item } likeCallback={this.like}
          comentarioCallback={this.adicionaComentario}/>

        }
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
