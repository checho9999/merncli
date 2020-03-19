import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ( { tarea } ) => {

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos los datos desde el tareaContext
    const { eliminarTarea, obtenerTareas } = tareasContext;

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto } = proyectosContext;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] =  proyecto;

    //Eliminamos un proyecto existente
    const onClickEliminarTarea = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoActual.id)
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

                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
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