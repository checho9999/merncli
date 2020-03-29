import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA   
       } from '../../types';

//Esta constante siempre tiene que empezar en mayuscula  
const AlertaState = props => {

    //State inicial del reducer
    const initialState = {
        alerta: null
    }

    //Dispatch para ejecutar las acciones del reducer
    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    ////Serie de funciones para las alertas////
    //Mostramos la alerta
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type:  MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        });

        //Luego de 5 segundos de mostrar la alerta automaticamente la limpiamos
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        > 
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;