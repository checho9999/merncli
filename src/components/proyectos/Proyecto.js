import React, { useContext }  from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ( { proyecto } ) => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyectoActual } = proyectosContext;

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos los datos desde el tareaContext
    const { obtenerTareas } = tareasContext;

    //Agregamos el proyecto actual y sus tareas
    const seleccionarProyecto = id => {
        //Seleccionamos el proyecto actual
        proyectoActual(id)
        //Filtramos sus tareas asociadas
        obtenerTareas(id)        
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto.id) }
            >{proyecto.nombre} </button>
        </li>
     );
}
 
export default Proyecto;