import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto, eliminarProyecto } = proyectosContext;

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos las tareas del proyecto
    const { tareasproyecto } = tareasContext;

    //tareasproyecto.map(tarea => console.log('ListadoTareas TAREAS TAREA ID: ' +  tarea._id));

    //Mensaje por si no hay un proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] =  proyecto;

    //Eliminamos un proyecto existente
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    :
                    <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Tarea                                
                                tarea={tarea}
                            />
                        </CSSTransition>    
                    ))}
                    </TransitionGroup> 
                }
            </ul>

            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default ListadoTareas;