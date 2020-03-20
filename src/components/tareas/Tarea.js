import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ( { tarea } ) => {

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos los datos desde el tareaContext
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto } = proyectosContext;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] =  proyecto;

    //Eliminamos un proyecto existente
    const onClickEliminarTarea = id => {
        //llamamos al dispatch para eliminar la tarea seleccionada
        eliminarTarea(id)
        //hacemo un refresh de las tareas del proyecto activo
        obtenerTareas(proyectoActual.id)
    }

    //Modificamos el estado actual de la tarea
    const cambiarEstado = tarea => {
        //invertimos el valor del estado de la tarea ante el click del usuario
        tarea.estado = !tarea.estado
        //llamamos al dispatch para hacer efectivo el cambio del estado
        cambiarEstadoTarea(tarea)
    }

    //Extraemos la tarea actual para editarla
    const seleccionarTarea = tarea => {
        //llamamos al dispatch para confirmar la tarea seleccionada
        guardarTareaActual(tarea)
    }
    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre} </p>

            <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickEliminarTarea(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;