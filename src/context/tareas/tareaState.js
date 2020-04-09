import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

//import { v4 as uuidv4 } from 'uuid';

import { TAREAS_PROYECTO, AGREGAR_TAREA,
         VALIDAR_TAREA, ELIMINAR_TAREA,
         //ESTADO_TAREA, 
         TAREA_ACTUAL,
         ACTUALIZAR_TAREA, LIMPIAR_TAREA
  } from '../../types';

import clienteAxios from '../../config/axios';

//Esta constante siempre tiene que empezar en mayuscula
const TareaState = props => {

    //State inicial del reducer
    const initialState = {    
        /*tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Colores', estado: false, proyectoId: 1},
            {id: 5, nombre: 'Elegir Hosting', estado: false, proyectoId: 2},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 3},
            {id: 7, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId: 4},
            {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4}
        ],*/
        //tareasproyecto: null,
        tareasproyecto: [], //ahora no es null, es un arreglo vacio
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch para ejecutar las acciones del reducer
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    //Obtenemos las tareas creadas
    //const obtenerTareas = proyectoId => {
    const obtenerTareas = async proyecto => {        
        //console.log(proyecto);
        try {

            //Cuando enviamos params, en el tareaController hay que leerlos como req.query en vez de req.body
            //Accedemos a la API para obtener todas las tareas de un proyecto con el _id del proyecto como params            
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            
            console.log(resultado);
         
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    //Agregamos un tarea al proyecto activo
    //const agregarTarea = tarea => {
    const agregarTarea = async tarea => {
        //generamos un id unico...lo quitamos porque ahora lo generamos desde MongoDB
        //tarea.id = uuidv4();
        //console.log(tarea.proyecto + ' ' + tarea.nombre);
        try {
            //Accedemos a la API para registrar la tarea
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado.data.tarea);

            dispatch({
                type: AGREGAR_TAREA,
                //se estaba pasando 'tarea' y generaba un tarea solo con nombre, por eso ahora le paso toda la respuesta 
                //y solo llamo a obtenerTareas desde Proyecto cuando se selecciona un proyecto determinado
                payload: resultado.data.tarea
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    //Informamos un error de validacion en el nombre de la tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    } 

    //Eliminamos una tarea existente
    //const eliminarTarea = id => {
    const eliminarTarea = async (id, proyecto) => {
        try {
            //Cuando enviamos params, en el tareaController hay que leerlos como req.query en vez de req.body
            //Accedemos a la API para eliminar la tarea con su id y con el _id del proyecto como params
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Cambiamos el estado de una tarea
    /*const cambiarEstadoTarea = tarea => {
        dispatch({
           type: ESTADO_TAREA,
           payload: tarea
       })
    }*/

    //Seleccionamos una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch({
           type: TAREA_ACTUAL,
           payload: tarea
       })
   }

    //Edita una tarea existente seleccionada
    //const actualizarTarea = tarea => {
    const actualizarTarea = async tarea => {
        try {
            //Accedemos a la API para actualizar el nombre o el estado de tarea con su id
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })

        } catch (error) {
            console.log(error);
        }
    }

    //Limpiamos la tareaseleccionada para que se resetea al FormTarea original, luego de que la misma fue editada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    } 

    return (
        <TareaContext.Provider
            value={{
                //tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea       
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;