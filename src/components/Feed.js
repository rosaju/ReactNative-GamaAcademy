import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage
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

    const uri = 'http://instalura-api.herokuapp.com/api/fotos';

    AsyncStorage.getItem('usuario')
      .then(usuarioEmTexto => JSON.parse(usuarioEmTexto))
      .then(usuario => {
        const request = {
          headers: new Headers({
            "X-AUTH-TOKEN": usuario.token
          })
        }
        return request
      })
      .then(request => fetch(uri, request))
      .then(response => response.json())
      .then(json => this.setState({fotos: json}))
  }

  // http://192.168.0.137:8080/api/fotos

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => JSON.parse(usuarioLogado))
      .then(usuario => {

        let novaLista = [];
        if(!foto.likeada) {
          novaLista = [
            ...foto.likers,
            {login: usuario}
          ]
        } else {
          novaLista = foto.likers
            .filter(liker => liker.login !== 'meuUsuario')
        }

        return novaLista
      })
      
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        this.atulizaFotos(fotoAtualizada);
      })

      const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;
      AsyncStorage.getItem('usuario')
        .then(usuarioLogado => JSON.parse(usuarioLogado))
        .then(usuario => {
          return {
            method: 'POST',
            headers: new Headers({
              "X-AUTH-TOKEN": usuario.token
            })
          }
        })
        .then(requestInfo => fetch(uri, requestInfo));
    
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {

    if(valorComentario === '')
    return;

    const foto = this.buscaPorId(idFoto);

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        texto: valorComentario
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    }

    const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`;
    
    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => JSON.parse(usuarioLogado))
      .then(usuario => {
        return {
          method: 'POST',
          body: JSON.stringify({
            texto: valorComentario
          }),
          headers: new Headers({
            "Content-type": "application/json",
            "X-AUTH-TOKEN": usuario.token
          })
        }
      })
      .then(requestInfo => fetch(uri,requestInfo))
      .then(resposta => resposta.json())
      .then(valorComentario => [...foto.comentarios, valorComentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.atulizaFotos(fotoAtualizada);
        inputComentario.clear();
      })
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