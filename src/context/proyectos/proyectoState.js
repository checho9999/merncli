import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, 
         AGREGAR_PROYECTO, VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL, ELIMINAR_PROYECTO  
       } from '../../types';

//Esta constante siempre tiene que empezar en mayuscula
const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño Sitio Web'},
        {id: 4, nombre: 'MERN'}
    ];

    //State inicial del reducer
    const initialState = {    
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null 
    }

    //Dispatch para ejecutar las acciones del reducer
    const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

    ////Serie de funciones para el CRUD////
    //mostramos el formulario al crear un nuevo proyecto
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtenemos los proyectos creados
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }
    
    //Creamos un nuevo proyecto
    const agregarProyecto = proyecto => {

        //generamos un id unico
        proyecto.id = uuidv4();
 
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }
    
    //Informamos un error de validacion en el nombre del proyecto
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    } 

    //Seleccionamos el proyecto en base a la eleccion del usuario
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminamos un proyecto existente
    const eliminarProyecto = async proyectoId => {
         dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;