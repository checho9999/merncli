import React, { useReducer } from 'react';
//import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, 
         AGREGAR_PROYECTO, VALIDAR_FORMULARIO,
         PROYECTO_ACTUAL, ELIMINAR_PROYECTO,
         PROYECTO_ERROR  
       } from '../../types';
       
import clienteAxios from '../../config/axios';

//Esta constante siempre tiene que empezar en mayuscula
const ProyectoState = props => {

    /*const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño Sitio Web'},
        {id: 4, nombre: 'MERN'}
    ];*/

    //State inicial del reducer
    const initialState = {    
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null 
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
    //const obtenerProyectos = () => {
    const obtenerProyectos = async () => {
        try {
            //Accedemos a la API con el token auth para obtener la informacion del proyecto
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })

        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    
    //Creamos un nuevo proyecto
    //const agregarProyecto = proyecto => {
    const agregarProyecto = async proyecto => {
        //generamos un id unico...lo quitamos porque ahora lo generamos desde MongoDB
        //proyecto.id = uuidv4();
        try {            
                       
            //Accedemos a la API para registrar el proyecto
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            //pasamos los datos del proyecto desde la API para insertarlos en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
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
        try {
            //Accedemos a la API para eliminar el proyecto seleccionado con su id
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })

        } catch (error) {

            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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