import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform
} from 'react-native';

import Post from './Post';

export default class Feed extends Component {

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

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto);

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

    this.atulizaFotos(fotoAtualizada);
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {

    if(valorComentario === '')
    return;

    const foto = this.buscaPorId(idFoto);

    const novaLista = [...foto.comentarios, {
      id: Math.random(),
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }
    
    this.atulizaFotos(fotoAtualizada);
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