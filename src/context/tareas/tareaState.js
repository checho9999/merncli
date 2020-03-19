import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO, AGREGAR_TAREA,
         VALIDAR_TAREA, ELIMINAR_TAREA
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
        errortarea: false
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

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea       
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;