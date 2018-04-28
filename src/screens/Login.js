import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  AsyncStorage,
  Text
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: ''
        }
    } 

    efetuaLogin = () => {

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })
        }

        const uri = 'https://instalura-api.herokuapp.com/api/public/login'
        fetch(uri, request)
        .then(response => {
            if(!response.ok)
                throw new Error('Não foi possível efetuar o login');

            return response.text()
        })
        .then(token => {

            const usuario = {
                nome: this.state.usuario,
                token
            }

            AsyncStorage.setItem('usuario', JSON.stringify(usuario))
            console.warn(usuario.nome)
            /* AsyncStorage.getItem('usuario')
                .then(usuarioStringified => console.warn(usuarioStringified))
                .then(usuario => console.warn(usuario.nome)) */

            this.props.navigator.resetTo({
                screen: 'FeedScreen',
                title: 'Instalura',
                navigatorStyle: {
                    navBarHidden: true
                }
            })

        })
        .catch(error => { 
            this.setState({validacao: error.message})
        })
    }

    logout() {
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
        console.warn('tchau')
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../resources/img/s2-checked.png')}/>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        autoCapitalize='none'
                        placeholder="Usuário ..."
                        onChangeText={texto => this.setState({usuario: texto})}/>
                    <TextInput style={styles.input}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        placeholder="Senha ..."
                        onChangeText={texto => this.setState({senha: texto})}/>
                    <Button title="Login"
                        onPress={this.efetuaLogin}/> 
                </View>

                <Text style={styles.messageError}>{this.state.validacao}</Text>
                
                <Button title="Logout"
                        onPress={this.logout}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: Dimensions.get('screen').width * 0.8,
        borderBottomColor: '#ddd'
    },
    messageError: {
        color: 'red',
        marginTop: 10
    }


})