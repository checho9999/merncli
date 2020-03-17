import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoTareas = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Simulamos tareas
    const tareasproyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir Plataformas de Pago', estado: false},
        {nombre: 'Elegir Hosting', estado: true}
    ]

    //Mensaje por si no hay un proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] =  proyecto;

    //Eliminamos un proyecto existente
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    : tareasproyecto.map(tarea => (
                        <Tarea 
                            tarea={tarea}
                        />
                    ))
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