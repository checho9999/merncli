import clienteAxios from './axios';

const tokenAuth = token => {

    //Si hay un token para pasarle al usuario
    if (token) {
        //Agregamos el token al header de Axios
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        //Borramos el token al header de Axios
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }

}

export default tokenAuth;