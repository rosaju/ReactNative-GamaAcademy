import { AppRegistry, AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Feed from './components/Feed'
import Login from './screens/Login'



export default () => {
    Navigation.registerComponent('LoginScreen', () => Login);
    Navigation.registerComponent('FeedScreen', () => Feed);

    AsyncStorage.getItem('usuario')
        .then(usuario => {
            if(usuario)
                return {
                    screen: 'FeedScreen',
                    title: 'Instalura'
                }
            return {
                screen: 'LoginScreen',
                title: 'Login',
                navigatorStyle: {
                    navBarHidden: true
                }
            }
        })
        .then(screen => Navigation.startSingleScreenApp({ screen }))
}