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

        const { likeCallback, fotos } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={likeCallback}>
                <Image  
                    source={ this.carregaIcone(fotos.likeada)} 
                    style={styles.botaoDeLike}/>
                </TouchableOpacity>
                
                {this.exibeLikes(fotos.likers)}
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
  