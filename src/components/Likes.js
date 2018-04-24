import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';



export default class Likes extends Component {

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

    render() {

        const { likeCallback, foto } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={ () => likeCallback(foto.id)}>
                <Image  
                    source={ this.carregaIcone(foto.likeada)} 
                    style={styles.botaoDeLike}/>
                </TouchableOpacity>
                
                {this.exibeLikes(foto.likers)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
      width: 40,
      height: 40
    },
    curtidas: {
        fontWeight: 'bold',
        marginBottom: 10
    }
  });
  