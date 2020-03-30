import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import { REGISTRO_EXITOSO, REGISTRO_ERROR,
    OBTENER_USUARIO, LOGIN_EXITOSO,
    LOGIN_ERROR, CERRAR_SESION
   } from '../../types';

//Esta constante siempre tiene que empezar en mayuscula
const AuthState = props => { //Tambien podriamos extraer ({children}) y pasar {children} en el Provider
    
    //State inicial del reducer
    const initialState = {        
        token: localStorage.getItem('token'), //Si el usuario tuvo un login correcto guardamos su JWT
        autenticado: null,
        usuario: null, 
        mensaje: null 
    }

    //Dispatch para ejecutar las acciones del reducer
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            
            //Accedemos a la API pare registrar el usuario y obtenemos el token auth en la respuesta
            const respuesta = await clienteAxios.post('/api/usuarios', datos);            
            console.log(respuesta.data);
            
            //pasamos los datos del usuario autenticado desde la API al state
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
                        
            //llamamos a la funcion para obtener el usuario autenticado y su informacion de sesion
            usuarioAutenticado();

        } catch (error) {
            //console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            //pasamos el detalle del registro erroneo al state
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }        
    }

    //Obtenemos el usuario autenticado desde la API
    const usuarioAutenticado = async () => {
        //Obtenemos el token auth desde el localstorage
        const token = localStorage.getItem('token');

        //Si el token existe, lo incluimos en el defaults headers del clienteAxios
        if (token) {
            tokenAuth(token);
        }

        try {
            //Accedemos a la API con el token auth para obtener la informacion del usuario
            const respuesta = await clienteAxios.get('/api/auth');
            // console.log(respuesta);
            //pasamos los datos del usuario registrado obtenidos desde la API al state
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {

            console.log(error.response);

            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}

export default AuthState;