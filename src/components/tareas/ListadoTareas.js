import React, { Fragment } from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {

    //Simulamos tareas
    const tareasproyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir Plataformas de Pago', estado: false},
        {nombre: 'Elegir Hosting', estado: true}
    ]

    return ( 
        <Fragment>
            <h2>Proyecto: Tienda Virtual </h2>

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
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default ListadoTareas;