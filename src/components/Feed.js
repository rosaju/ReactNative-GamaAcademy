import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage
} from 'react-native';

import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService'
import Notificacao from '../api/Notificacao'


export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto => 
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    )
    this.setState({fotos})
  }

  componentDidMount() {
    InstaluraFetchService.get('/fotos')
      .then(json => this.setState({fotos: json}))
  }

  // http://192.168.0.137:8080/api/fotos

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  like = (idFoto) => {
    const listaOriginal = this.state.fotos
    const foto = this.buscaPorId(idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => JSON.parse(usuarioLogado))
      .then(usuario => {

        let novaLista = [];
        if(!foto.likeada) {
          novaLista = [
            ...foto.likers,
            {login: usuario.nome}
          ]
        } else {
          novaLista = foto.likers
            .filter(liker => liker.login !== usuario.nome)
        }

        return novaLista
      })

      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        this.atualizaFotos(fotoAtualizada);
      })

      InstaluraFetchService.post(`/fotos/${idFoto}/likes`)
        .then(response => {
          if(response.ok)
            return

          Notificacao.exibe('Desculpe!', 'Não foi possível curtir a foto')
          this.setState({fotos: listaOriginal})
        })
    
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {

    if(valorComentario === '')
    return;

    const foto = this.buscaPorId(idFoto);

    const comentario = {
      texto: valorComentario
    }

    InstaluraFetchService.post(`/fotos/${idFoto}/like`)
      .catch(error => {

        Notificacao.exibe()

        this.setState({fotos: listaOriginal})
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