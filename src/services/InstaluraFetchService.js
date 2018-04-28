import { AsyncStorage } from 'react-native';


const path = `http://instalura-api.herokuapp.com/api`;

export default class InstaluraFetchService {

    static get(recurso) {
        const uri = `${path}${recurso}`;

        return AsyncStorage.getItem('usuario')
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
            .then(response => {
                if(!response.ok)
                    throw new Error('Não foi possivel completar a operação')
                
                    return response.json();
            })

    }

    static post(recurso) {

        const uri = `${path}${recurso}`;
            return AsyncStorage.getItem('usuario')
                .then(usuarioLogado => JSON.parse(usuarioLogado))
                .then(usuario => {
                return {
                    method: 'POST',
                    body: JSON.stringify(dados),
                    headers: new Headers({
                        "X-AUTH-TOKEN": usuario.token,
                        "Content-type": "application/json"
                    })
                }

                return request
                })
                .then(requestInfo => fetch(uri, requestInfo))
                .then(response => response.json())

    }

   
}