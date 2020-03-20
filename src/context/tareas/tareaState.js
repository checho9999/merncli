import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { v4 as uuidv4 } from 'uuid';

import { TAREAS_PROYECTO, AGREGAR_TAREA,
         VALIDAR_TAREA, ELIMINAR_TAREA,
         ESTADO_TAREA, TAREA_ACTUAL,
         ACTUALIZAR_TAREA, LIMPIAR_TAREA
  } from '../../types';

//Esta constante siempre tiene que empezar en mayuscula
const TareaState = props => {

    //State inicial del reducer
    const initialState = {    
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Colores', estado: false, proyectoId: 1},
            {id: 5, nombre: 'Elegir Hosting', estado: false, proyectoId: 2},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 3},
            {id: 7, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId: 4},
            {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }

    //Dispatch para ejecutar las acciones del reducer
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    //Obtenemos las tareas creadas
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //Agregamos un tarea al proyecto activo
    const agregarTarea = tarea => {

        //generamos un id unico
        tarea.id = uuidv4();

        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Informamos un error de validacion en el nombre de la tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    } 

    //Eliminamos una tarea existente
    const eliminarTarea = id => {
        dispatch({
           type: ELIMINAR_TAREA,
           payload: id
       })
   }

    //Cambiamos el estado de una tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
           type: ESTADO_TAREA,
           payload: tarea
       })
    }

    //Seleccionamos una tarea para editarla
    const guardarTareaActual = tarea => {
        dispatch({
           type: TAREA_ACTUAL,
           payload: tarea
       })
   }

    //Edita una tarea existente seleccionada
    const actualizarTarea = tarea => {
        dispatch({
           type: ACTUALIZAR_TAREA,
           payload: tarea
       })
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
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
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